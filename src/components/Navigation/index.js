import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

import { Link } from 'react-router-dom';
import './index.css';
import { AuthUserContext } from '../Session';
// import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';

const Navigation = () => (
	<Container fluid={true} id="Navigation">
		<AuthUserContext.Consumer>
			{authUser => (authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />)}
		</AuthUserContext.Consumer>
	</Container>
);

const NavigationAuth = ({ authUser }) => (
	<Container fluid={true}>
		<Row>
			<Col lg="auto" md="auto" sm="auto">
				<Link className="link float-right" to={ROUTES.HOME}>
					Home
				</Link>
			</Col>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto">
				<SignOutGoogle />
			</Col>
		</Row>
	</Container>
);

const NavigationNonAuth = () => (
	<Container fluid={true}>
		<Row noGutters={true}>
			<Col></Col>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto">
				<SignInGoogle />
			</Col>
		</Row>
	</Container>
);

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;
class SignInGoogleButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
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

	render() {
		// const { error } = this.state;

		return (
			<button className="signInButton float-right" type="submit" onClick={this.onSubmit}>
				Sign In
			</button>
			// {error && <p>{error.message}</p>}
		);
	}
}
class SignOutGoogleButton extends Component {
	signOut = () => {
		this.props.firebase.doSignOut().then(() => {
			this.props.history.push(ROUTES.SIGN_IN);
		});
	};
	render() {
		return (
			<button className="signOutButton" type="button" onClick={this.signOut}>
				Sign Out
			</button>
		);
	}
}

const SignOutGoogle = compose(
	withRouter,
	withFirebase
)(SignOutGoogleButton);
const SignInGoogle = compose(
	withRouter,
	withFirebase
)(SignInGoogleButton);
export default Navigation;
export { SignInGoogle, SignOutGoogle };
