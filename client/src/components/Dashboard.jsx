import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';

const Dashboard = ({ secretData }) => (
    <Card className="container">
        <CardTitle
            title="Files"
            subtitle="You should get access to this page only after authentication."
        />
        <List>
            <ListItem primaryText="Inbox"/>
            <ListItem primaryText="Starred"/>
            <ListItem primaryText="Sent mail"/>
            <ListItem primaryText="Drafts"/>
            <ListItem primaryText="Inbox"/>
        </List>

        {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
    </Card>

);

Dashboard.propTypes = {
    secretData: PropTypes.string.isRequired
};

export default Dashboard;
