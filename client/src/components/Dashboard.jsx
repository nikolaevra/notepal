import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';

const Dashboard = ({children}) => (
    <Card className="container">
        <CardTitle
            title="Files"
            subtitle="You should get access to this page only after authentication."
        />
        {children}
    </Card>
);

Dashboard.propTypes = {
    children: PropTypes.object.isRequired
};

export default Dashboard;
