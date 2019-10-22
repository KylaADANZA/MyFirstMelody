import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './index.css';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image } from 'react-bootstrap';

const SignInPage = () => (
	<Container fluid={true} id="signInPage">
		<Row>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto" className="heading">
				<h1>My First Melody</h1>
			</Col>
			<Col></Col>
		</Row>
		<SignInGoogle />
	</Container>
);

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameNo: 'gameImage1',
			imageUrl: 'images/tapTune.png',
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
		if (this.state.gameNo === 'gameImage1') {
			this.setState({ gameNo: 'gameImage2', imageUrl: 'images/funkyNotes.png' });
		} else if (this.state.gameNo === 'gameImage2') {
			this.setState({ gameNo: 'gameImage3', imageUrl: 'images/musicalMemory.png' });
		} else {
			this.setState({ gameNo: 'gameImage1', imageUrl: 'images/tapTune.png' });
		}
	};

	render() {
		return (
			<Container fluid={true}>
				<Row className="align-items-center justify-content-center">
					<Col>
						<Image className="float-left arrow" src="images/leftArrow.png" onClick={this.showNextImage} />
					</Col>
					<Col className="image-container" lg="auto" md="auto" sm="auto" xs="auto">
						<Image className="gameImage" src={this.state.imageUrl} />
					</Col>
					<Col>
						<Image className="float-right arrow" onClick={this.showNextImage} src="images/rightArrow.png" />
					</Col>
				</Row>
				<Row className="align-items-center">
					<Col></Col>
					<Col lg="auto" md="auto" sm="auto" xs="auto">
						<button className="playNow" onClick={this.onSubmit} type="submit">
							Play Now!
						</button>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		);
	}
}

const SignInGoogle = compose(
	withRouter,
	withFirebase
)(SignInComponent);

export { SignInGoogle };
export default SignInPage;
