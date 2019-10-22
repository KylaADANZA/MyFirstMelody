import React from 'react';
import * as ROUTES from '../../constants/routes';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';

const Game3Page = () => (
	<Container fluid={true} id="Game3Page">
		<Row>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto" className="heading">
				<h1>Funky Notes</h1>
			</Col>
			<Col></Col>
		</Row>
	</Container>
);

// const condition = authUser => !!authUser;

export default Game3Page;
