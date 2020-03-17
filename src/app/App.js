import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from '../pages/loginPage/LoginPage';
import Home from '../pages/homePage/HomePage';
import ViewAlert from '../pages/viewAlert/ViewAlert';
import TopBar from '../components/topbar/TopBar';
import LoginTopBar from '../components/logintopbar/LoginiTopBar';
import Register from '../pages/registerPage/RegisterPage';
import Create from '../pages/createAlert/CreateAlert';
import MyAlerts from '../pages/myAlertsPage/MyAlertPage';

import history from '../services/history';
import ROUTES from '../routes/Routes';

import './App.css';

export default () => {

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={LoginTopBar} />
          <Route exact path={ROUTES.HOME} component={() => <TopBar nomePagina="Home"/>} />
          <Route exact path={ROUTES.CREATE} component={() => <TopBar nomePagina="Criar alerta"/>} />
          <Route exact path={ROUTES.VIEW_ALERT} component={() => <TopBar nomePagina="Visualizar Alerta" />} />
          <Route exact path={ROUTES.MY_ALERTS} component={() => <TopBar nomePagina="Meus alertas" />} />
          <Route exact path={ROUTES.OTHERS} component={LoginTopBar} />
        </Switch>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.CREATE} component={Create} />
          <Route exact path={ROUTES.REGISTER} component={Register} />
          <Route exact path={ROUTES.VIEW_ALERT} component={ViewAlert} />
          <Route exact path={ROUTES.MY_ALERTS} component={MyAlerts} />
          <Route exact path={ROUTES.OTHERS} component={Login} />
        </Switch>
      </Router>
    </div>
  );
}
