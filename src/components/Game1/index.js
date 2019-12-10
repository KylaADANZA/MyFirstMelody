import * as ROUTES from '../../constants/routes';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import './index.css';
import { Sampler } from "tone";
import C1 from './my-sounds/C1.mp3';
import B1 from './my-sounds/B1.mp3';
import A1 from './my-sounds/A1.mp3';
import D1 from './my-sounds/D1.mp3';
import E1 from './my-sounds/E1.mp3';
import F1 from './my-sounds/F1.mp3';
import G1 from './my-sounds/G1.mp3';
import piano from './my-sounds/piano.png';

const Game1Page = () => (
  <Container fluid={true} id="Game1Page">
    <Row>
      <Col></Col>
      <Col lg="auto" md="auto" sm="auto" className="heading">
        <h1>Funky Notes</h1>
      </Col>
      <Col>
      </Col>
    </Row>
    <Row>
      <Game1Component></Game1Component>
    </Row>
  </Container>
);

export class Game1Component extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameOn: false,
      chosenImage: "",
      boxes: [],
      level: 1,
      displayNextButton: false,
      shake: false,
      show: false,
      finishGame: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickBase = this.handleClickBase.bind(this);

    this.sampler = new Sampler(
      { C1, B1, A1, D1, E1, F1, G1 },
      {
        onload: () => {
          this.setState({ isLoaded: true });
        }
      }
    ).toMaster();
  }

  handleClick() {
    const notes = [
      { level: 1, baseNote: "C1", qnote: "F1" },
      { level: 2, baseNote: "C1", qnote: "D1" },
      { level: 3, baseNote: "C1", qnote: "G1" },
      { level: 4, baseNote: "C1", qnote: "A1" },
      { level: 5, baseNote: "C1", qnote: "E1" },
    ]
    this.sampler.triggerAttack(notes[this.state.level - 1].qnote);


  }
  handleClickBase() {
    this.sampler.triggerAttack("C1");
  }



  displayTutorialOrGame = () => {
    if (!this.state.gameOn) {
      return (
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <h2 className="intro"> The aim of this game is to learn the sound of each notes. Watch a quick video of the notes with their coressponding notes</h2>
            </Row>
            <Row className="align-items-center justifyjustify-content-center">
              <Col className="image-container" lg="auto" md="auto" sm="auto" xs="auto">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/g9CVXT8fOdw?start=5" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </Col>
            </Row>
            <Row lg="auto" md="auto" sm="auto" xs="auto">
              <Col></Col>
              <Col>
                <button className="playButtonGame1" type="submit" onClick={this.openGame1}> PLAY </button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      )
    } else {
      return (
        <div>
          <Row>
            <Col xs="auto" md="auto" lg="auto">
              <div className={this.state.level == 1 ? "levelCircle" : "circleStyle"}>1</div>
              <div className={this.state.level == 2 ? "levelCircle" : "circleStyle"}>2</div>
              <div className={this.state.level == 3 ? "levelCircle" : "circleStyle"}>3</div>
              <div className={this.state.level == 4 ? "levelCircle" : "circleStyle"}>4</div>
              <div className={this.state.level == 5 ? "levelCircle" : "circleStyle"}>5</div>
            </Col>
            <Col>
              <button className={'baseButton'} disabled={!this.state.isLoaded} onClick={this.handleClickBase}>
                Play base note C
				        </button>
            </Col>
            <Col className={'align-self-center justify-content-center'}>
              <Image src={piano} />
            </Col>
            <Col xs="auto" md="auto" lg="auto">
              <button className={'baseButton'} disabled={!this.state.isLoaded} onClick={this.handleClick}>
                What is this note?
				        </button>
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

        </div>
      )
    }
  }



  checkAnswer = (letter) => {
    if (this.state.level == 1 && letter == 'F') {
      const setBoxes = [
        { id: 0, letter: 'B' },
        { id: 1, letter: 'G' },
        { id: 2, letter: 'D' },
        { id: 3, letter: 'A' },
      ]

      this.setState({
        level: 2,
        boxes: setBoxes,
        chosenImage: "images/noteC.png",
      })
    } else if (this.state.level == 2 && letter == 'D') {
      const setBoxes = [
        { id: 0, letter: 'G' },
        { id: 1, letter: 'D' },
        { id: 2, letter: 'E' },
        { id: 3, letter: 'A' },
      ]
      this.setState({
        level: 3,
        boxes: setBoxes,
        chosenImage: "images/noteD.png",
      })
    } else if (this.state.level == 3 && letter == 'G') {
      const setBoxes = [
        { id: 0, letter: 'B' },
        { id: 1, letter: 'G' },
        { id: 2, letter: 'E' },
        { id: 3, letter: 'A' },
      ]

      this.setState({
        level: 4,
        boxes: setBoxes,
        chosenImage: "images/noteB.png",
      })
    } else if (this.state.level == 4 && letter == 'A') {
      const setBoxes = [
        { id: 0, letter: 'G' },
        { id: 1, letter: 'A' },
        { id: 2, letter: 'C' },
        { id: 3, letter: 'E' },
      ]

      this.setState({
        level: 5,
        boxes: setBoxes,
        chosenImage: "my-sounds/piano.png",
      })
    } else if (this.state.level == 5 && letter == 'E') {
      this.setState({
        finishGame: true,
      })
    } else {
      this.setState({ shake: true })
    }
  }

  showNextButton = () => {
    if (this.state.gameOn && this.state.displayNextButton) {
      return (
        <button className="nextButton" type="submit">Next</button>
      )
    }
  }

  openGame1 = () => {
    const setBoxes = [
      { id: 0, letter: 'D' },
      { id: 1, letter: 'B' },
      { id: 2, letter: 'F' },
      { id: 3, letter: 'A' },
    ]
    this.setState({
      gameOn: true,
      chosenImage: "images/noteF.png",
      boxes: setBoxes,
    });
  }

  showBackButton = () => {
    if (this.state.gameOn) {
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
  handleCloseGame = () => {
    this.setState({
      finishGame: false,
    })
  }

  showFinishGameModal = () => {
    return (
      <>
      <Modal
        show={this.state.finishGame}
        onHide={this.handleCloseGame}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>Well done on completing Musical Memory! To play another game click Continue. To go back to the tutorial click Tutorial.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.goToTutorial}>
            Tutorial
          </Button>
          <Link to={ROUTES.HOME}>
            <Button variant="primary">
              Continue
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      </>
    );

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
      handleCloseGame: false,
    })
  }

  render() {
    return (
      <Container fluid={true} className="game1Container">
        {this.displayTutorialOrGame()}
        {this.showBackButton()}
        {this.showModal()}
        {this.showNextButton()}
        {this.showFinishGameModal()}
      </Container>
    );
  }
}

// const condition = authUser => !!authUser;

export default Game1Page;
