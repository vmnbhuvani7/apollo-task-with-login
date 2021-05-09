import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Employee from './page/Employee';
import Login from './page/Login';
import Registration from './page/Registration';
import PrivetRouter from './PrivetRouter';

const MainRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/registration" component={Registration} />
                    <PrivetRouter exact path="/dashboard" component={Dashboard} />
                    <PrivetRouter exact path="/employee" component={Employee} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default MainRouter
