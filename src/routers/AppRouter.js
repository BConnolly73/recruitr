import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from './../components/DashboardPage.js';
import LoginPage from './../components/LoginPage.js';
import NotFoundPage from './../components/NotFoundPage.js';

import NewParticipantPage from './../components/participantComponents/NewParticipantPage.js';
import ParticipantsViewPage from './../components/participantComponents/ParticipantsViewPage.js';
import EditParticipantPage from './../components/participantComponents/EditParticipantPage.js';

import NewDrillPage from './../components/drillComponents/NewDrillPage.js';


import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage} exact={true}/>
                <PrivateRoute path="/new_participant" component={NewParticipantPage} exact={true}/>
                <PrivateRoute path="/participants" component={ParticipantsViewPage} exact={true}/>
                <PrivateRoute path="/edit_participant/:id" component={EditParticipantPage}/>

                <PrivateRoute path="/new_drill" component={NewDrillPage} exact={true}/>

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;