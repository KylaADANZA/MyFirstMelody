import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import Game1Page from '../Game1';
import Game2Page from '../Game2';
import Game3Page from '../Game3';

import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session';
import './index.css';
import { withAuthentication } from '../Session';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row} from 'react-bootstrap';

const App = () => (
  <Router>
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Route exact path="/">
          <AuthUserContext.Consumer>
            {authUser => (authUser ? <Redirect to={ROUTES.HOME} /> : <Redirect to={ROUTES.SIGN_IN} />)}
          </AuthUserContext.Consumer>
        </Route>
      </Row>
      <Row>
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      </Row>
      <Row>
        <Route path={ROUTES.HOME} component={HomePage} />
      </Row>
      <Row>
        <Route path={ROUTES.GAME1} component={Game1Page} />
      </Row>
      <Row>
        <Route path={ROUTES.GAME2} component={Game2Page} />
      </Row>
      <Row>
        <Route path={ROUTES.GAME3} component={Game3Page} />
      </Row>
    </Container>
  </Router>
);

export default withAuthentication(App);
