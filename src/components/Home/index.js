import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => (
	<Container fluid={true} id="signInPage">
		<Row>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto" className="heading">
				<h1>Home Page</h1>
			</Col>
			<Col></Col>
		</Row>{' '}
		<Row className="align-items-center justify-items-center">
			<Col>
			</Col>
		</Row>
	</Container>
);

// const condition = authUser => !!authUser;

export default HomePage;
