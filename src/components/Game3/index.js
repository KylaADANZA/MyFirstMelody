//import * as ROUTES from '../../constants/routes';
//import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import './index.css';

const Game3Page = () => (
	<Container fluid={true} id="Game3Page">
		<Row>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto" className="heading">
				<h1>Funky Notes</h1>
			</Col>
			<Col></Col>
		</Row>
    <Row>
      <Game3Component></Game3Component>
    </Row>
	</Container>
);

export class Game3Component extends Component {
  constructor(props) {
    super(props)
    this.state={
      gameOn: false,
      chosenImage: "",
      boxes: [],
      level: 1,
      displayNextButton: false,
      shake: false,
      show: false,
    }
  }

  displayTutorialOrGame = () => {
    if(!this.state.gameOn) {
      return (
        <Row>
          <Row>
            <h2 className="intro"> The aim of this game is to select the correct key signature to the notes displayed on a musical stave, but first we need to learn their names. Click PLAY when you're done.</h2>
          <Row className="align-items-center justify-content-center">
            <Col className="image-container" lg="auto" md="auto" sm="auto" xs="auto">
              <Image className="noteTutorialImage3" src="images/musicNotes.png" />
            </Col>
          </Row>
          </Row>
          <Row className="align-items-center">
            <Col></Col>
            <Col lg="auto" md="auto" sm="auto" xs="auto">
              <button className="playButton" type="submit" onClick={this.openGame3}> PLAY </button>
            </Col>
            <Col></Col>
          </Row>
        </Row>
      )
    } else {
      return (
        <Row>
          <Col>
            <div className={this.state.level == 1 ? "levelCircle" : "circleStyle"}>1</div>
            <div className={this.state.level == 2 ? "levelCircle" : "circleStyle"}>2</div>
            <div className={this.state.level == 3 ? "levelCircle" : "circleStyle"}>3</div>
            <div className={this.state.level == 4 ? "levelCircle" : "circleStyle"}>4</div>
            <div className={this.state.level == 5 ? "levelCircle" : "circleStyle"}>5</div>
          </Col>
          <Row>
            <Col>
              <Image className="cardStyle" src={this.state.chosenImage}/>
            </Col>
          </Row>
          <Row>
            {this.state.boxes.map(card => (
              <Col key={card.id}>
                <button
                  key={card.id}
                  onClick={() => this.checkAnswer(card.letter)}
                  onAnimationEnd={() => this.setState({ shake: false })}
                  className={this.state.shake ? "shakeBox" : "boxStyle"}
                >
                  {card.letter}
                </button>
              </Col>
              )
            )}
          </Row>
        </Row>
      )
    }
  }

  checkAnswer = (letter) => {
    if(this.state.level == 1 && letter == 'F') {
      const setBoxes = [
        {id: 0, letter: 'A'},
        {id: 1, letter: 'G'},
        {id: 2, letter: 'C'},
        {id: 3, letter: 'B'},
      ]

      this.setState({
        level: 2,
        boxes: setBoxes,
        chosenImage: "images/noteC.png",
      })
    } else if (this.state.level == 2 && letter == 'C') {
      const setBoxes = [
        {id: 0, letter: 'F'},
        {id: 1, letter: 'E'},
        {id: 2, letter: 'D'},
        {id: 3, letter: 'A'},
      ]
      this.setState({
        level: 3,
        boxes: setBoxes,
        chosenImage: "images/noteD.png",
      })
    } else if (this.state.level == 3 && letter == 'D') {
      const setBoxes = [
        {id: 0, letter: 'B'},
        {id: 1, letter: 'G'},
        {id: 2, letter: 'E'},
        {id: 3, letter: 'F'},
      ]

      this.setState({
        level: 4,
        boxes: setBoxes,
        chosenImage: "images/noteB.png",
      })
    } else if (this.state.level == 4 && letter == 'B') {
      const setBoxes = [
        {id: 0, letter: 'A'},
        {id: 1, letter: 'G'},
        {id: 2, letter: 'C'},
        {id: 3, letter: 'E'},
      ]

      this.setState({
        level: 5,
        boxes: setBoxes,
        chosenImage: "images/noteG.png",
      })
    } else if (this.state.level == 5 && letter == 'G') {
      this.setState({
        displayNextButton: true,
      })
    } else {
      this.setState({shake: true})
    }
  }

  showNextButton = () => {
    if(this.state.gameOn && this.state.displayNextButton) {
      return (
        <button className="nextButton"  type="submit">Next</button>
      )
    }
  }

  openGame3 = () => {
    const setBoxes = [
      {id: 0, letter: 'D'},
      {id: 1, letter: 'F'},
      {id: 2, letter: 'A'},
      {id: 3, letter: 'E'},
    ]
    this.setState({
      gameOn: true,
      chosenImage: "images/noteF.png",
      boxes: setBoxes,
    });
  }

  showBackButton = () => {
    if(this.state.gameOn) {
      return (
        <button className="backButton" type="submit" onClick={this.handleShow}>Back</button>
      )
    }
  }

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  handleShow = () => {
    this.setState({
      show: true,
    })
  }

  showModal = () => {
    return (
      <>
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header></Modal.Header>
         <Modal.Body>Are you sure you want to go back? You will lose all your progress in the game.</Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={this.handleClose}>
             Close
           </Button>
           <Button variant="primary" onClick={this.goToTutorial}>
             Continue
           </Button>
         </Modal.Footer>
       </Modal>
      </>
    );
  }

  goToTutorial = () => {
    this.setState({
      gameOn: false,
      show: false,
    })
  }

  render() {
    return (
      <Container fluid={true} className="game3Container">
        {this.displayTutorialOrGame()}
        {this.showBackButton()}
        {this.showModal()}
        {this.showNextButton()}
      </Container>
    );
  }
}

// const condition = authUser => !!authUser;

export default Game3Page;
