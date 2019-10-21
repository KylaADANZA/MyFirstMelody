import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './index.css';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row} from 'react-bootstrap';

const SignInPage = () => (
  <Container id='signInPage'>
  <Row>
    <div className='heading'>
      <h1>My First Melody</h1>
      <SignInGoogle />
      </div>
    </Row>
  </Container>
);

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
      this.state = {
        error: null,
        gameNo: 'gameImage1',
      };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  showNextImage = () => {
    if(this.state.gameNo === 'gameImage1') {
      this.setState({ gameNo: 'gameImage2' });
    } else if(this.state.gameNo === 'gameImage2') {
      this.setState({ gameNo: 'gameImage3' });
    } else {
      this.setState({ gameNo: 'gameImage1' });
    }
  }

  render() {
    const { error } = this.state;

    return (
        <div>
          <button className='signInButton' type="submit" onClick={this.onSubmit}>Sign In</button>
          {error && <p>{error.message}</p>}
          <button className='playNow' onClick={this.onSubmit} type="submit">
            Play Now!
          </button>
          <button type="submit" className='leftArrow' onClick={this.showNextImage}/>
          <button type="submit" className='rightArrow'onClick={this.showNextImage}/>
          <div className={this.state.gameNo}/>
        </div>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInPage;

export { SignInGoogle,};
