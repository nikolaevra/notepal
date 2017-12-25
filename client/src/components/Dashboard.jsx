import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';

const Dashboard = () => (
    <Card className="container">
        <CardTitle
            title="Files"
            subtitle="You should get access to this page only after authentication."
        />
    </Card>
);

export default Dashboard;
