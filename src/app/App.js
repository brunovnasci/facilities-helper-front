import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from '../pages/loginPage/LoginPage';
import Home from '../pages/homePage/HomePage';
import ViewAlert from '../pages/viewAlert/ViewAlert';
import TopBar from '../components/topbar/TopBar';
import LoginTopBar from '../components/logintopbar/LoginiTopBar';
import Register from '../pages/registerPage/RegisterPage';
import Create from '../pages/createAlert/CreateAlert';

import history from '../services/history';
import path from '../routes/Routes';

import './App.css';

export default () => {

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Route exact path={path.login} component={LoginTopBar} />
          <Route exact path={path.home} component={() => <TopBar nomePagina="Home"/>} />
          <Route exact path={path.create} component={() => <TopBar nomePagina="Criar alerta"/>} />
          <Route exact path={path["view-alert"]} component={() => <TopBar nomePagina="Visualizar Alerta" />} />
          <Route exact path={path.other} component={LoginTopBar} />
        </Switch>
        <Switch>
          <Route exact path={path.login} component={Login} />
          <Route exact path={path.home} component={Home} />
          <Route exact path={path.create} component={Create} />
          <Route exact path={path.register} component={Register} />
          <Route exact path={path["view-alert"]} component={ViewAlert} />
          <Route exact path={path.other} component={Login} />
        </Switch>
      </Router>
    </div>
  );
}
