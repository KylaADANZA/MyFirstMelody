import React from 'react';
import * as ROUTES from '../../constants/routes';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image } from 'react-bootstrap';

const HomePage = () => (
	<Container fluid={true} id="signInPage">
		<Row>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto" className="heading">
				<h1>Play Now!</h1>
			</Col>
			<Col></Col>
		</Row>
		<Row className="align-items-center justify-items-center">
			<Col>
				<Link to={ROUTES.GAME1}><Image STYLE="position:absolute; TOP:35px; LEFT:0px; WIDTH:350px; HEIGHT:300px" src="
				images/tapTune.png"></Image></Link>
			</Col>
		</Row>
		<Row className="align-items-center justify-items-center">
			<Col>
				<Link to={ROUTES.GAME2}><Image STYLE="position:absolute; TOP:35px; LEFT:400px; WIDTH:350px; HEIGHT:300px" src="
				images/musicalMemory.png"></Image></Link>
			</Col>
		</Row>
		<Row className="align-items-center justify-items-center">
			<Col>
				<Link to={ROUTES.GAME3}><Image STYLE="position:absolute; TOP:35px; LEFT:800px; WIDTH:350px; HEIGHT:300px" src="
				images/funkyNotes.png"></Image></Link>
			</Col>
		</Row>
	</Container>
);

// const condition = authUser => !!authUser;

export default HomePage;
