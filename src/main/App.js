import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from '../components/loginform/LoginForm';
import Home from '../components/home/Home';
import Alert from '../components/alert/Alert';
import TopBar from '../components/topbar/TopBar';
import LoginTopBar from '../components/logintopbar/LoginiTopBar';
import Register from '../components/registerform/RegisterForm';
import Create from '../components/createAlert/CreateAlert';

import history from '../services/history';

import './App.css';

export default () => {

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginTopBar} />
          <Route exact path="/home" component={() => <TopBar nomePagina="Home"/>} />
          <Route exact path="/create" component={() => <TopBar nomePagina="Criar alerta"/>} />
          <Route exact path="/alert/:id" component={() => <TopBar nomePagina="Visualizar Alerta" />} />
          <Route exact path="/*" component={LoginTopBar} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/alert/:id" component={Alert} />
          <Route exact path="/*" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}
