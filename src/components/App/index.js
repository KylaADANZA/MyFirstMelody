import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import HomePage from '../Home';

import * as ROUTES from '../../constants/routes';
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
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      </Row>
      <Row>
        <Route path={ROUTES.HOME} component={HomePage} />
      </Row>
    </Container>
  </Router>
);

export default withAuthentication(App);
