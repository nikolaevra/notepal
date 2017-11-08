-- Creation of the users table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Create the actual table
CREATE TABLE notepal.t_user (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    active boolean DEFAULT false NOT NULL,
    last_connected timestamp NOT NULL default now(),
    is_deleted boolean DEFAULT false NOT NULL
);

-- Use id column as the primary key
ALTER TABLE ONLY notepal.t_user ADD CONSTRAINT t_user_pkey PRIMARY KEY (id);

-- Create indices for usernames since we will be searching those a lot
CREATE INDEX idx_username ON notepal.t_user (username);
CREATE INDEX idx_email ON notepal.t_user (email);
