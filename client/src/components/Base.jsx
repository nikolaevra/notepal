import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth.jsx';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Base = ({ children }) => (
  <div>
      <AppBar
          title="Notepal"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={Auth.isUserAuthenticated() ? (
              <div className="top-bar-right">
                  <Link to="/logout">Log out</Link>
              </div>
          ) : (
              <div className="top-bar-right">
                  <Link to="/login">Log in</Link>
                  <Link to="/signup">Sign up</Link>
              </div>
          )}
      />

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
