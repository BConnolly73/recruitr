import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Default
import DashboardPage from './../components/DashboardPage.js';
import LoginPage from './../components/LoginPage.js';
import NotFoundPage from './../components/NotFoundPage.js';

// Settings
import SettingsPage from './../components/Pages/SettingsPage';

// Participants
import CreateParticipantPage from './../components/Pages/Participants/CreateParticipantPage';

// Drills
import DrillDashboard from './../components/Pages/Drills/DrillDashboard';
import CreateDrillPage from './../components/Pages/Drills/CreateDrillPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>

                <PrivateRoute path="/dashboard" component={DashboardPage} exact={true}/>
                <PrivateRoute path="/settings" component={SettingsPage} exact={true}/>
                <PrivateRoute path="/create_participant" component={CreateParticipantPage} exact={true}/>

                <PrivateRoute path="/drills" component={DrillDashboard} exact={true}/>
                <PrivateRoute path="/create_drill" component={CreateDrillPage} exact={true}/>

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;