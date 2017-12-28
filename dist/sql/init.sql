

SET ROLE api_login_role

-- Creation of the users table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the actual table
CREATE TABLE notepal.t_user (
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    active boolean DEFAULT false NOT NULL,
    last_connected timestamp NOT NULL default now(),
    is_deleted boolean DEFAULT false NOT NULL
);
ALTER TABLE ONLY notepal.t_user ADD CONSTRAINT t_user_pkey PRIMARY KEY (user_id);
CREATE INDEX idx_username ON notepal.t_user (username);
CREATE INDEX idx_email ON notepal.t_user (email);


-- Creation of the files table
DROP TABLE IF EXISTS notepal.t_files CASCADE;
CREATE TABLE notepal.t_files (
  file_id uuid DEFAULT uuid_generate_v4() NOT NULL,
  user_id uuid NOT NULL,
  file_data text NOT NULL,
  file_recent_date date NOT NULL DEFAULT CURRENT_DATE
);
ALTER TABLE ONLY notepal.t_files ADD CONSTRAINT t_file_pkey PRIMARY KEY (file_id);


-- Creation of junction table for users and files
DROP TABLE IF EXISTS notepal.t_user_file_junct;
CREATE TABLE notepal.t_user_file_junct (
  user_id uuid REFERENCES notepal.t_user (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  file_id uuid REFERENCES notepal.t_files (file_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_file_pkey PRIMARY KEY (user_id, file_id)
);


-- Trigger function for user file junction table
CREATE OR REPLACE FUNCTION update_files_junct()
  RETURNS trigger AS
$BODY$
BEGIN
 INSERT INTO notepal.t_user_file_junct(user_id,file_id)
 VALUES(NEW.user_id,NEW.file_id);

 RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS file_junct_update ON notepal.t_files;
CREATE TRIGGER file_junct_update
  AFTER INSERT
  ON notepal.t_files
  FOR EACH ROW
  EXECUTE PROCEDURE update_files_junct();
