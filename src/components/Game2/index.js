//import * as ROUTES from '../../constants/routes';
//import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col , Image, Modal, Button} from 'react-bootstrap';
import React, { Component } from 'react';
import './index.css';

const Game2Page = () => (
	<Container fluid={true} id="Game2Page">
		<Row>
			<Col></Col>
			<Col lg="auto" md="auto" sm="auto" className="heading">
				<h1>Musical Memory</h1>
			</Col>
			<Col></Col>
		</Row>
    <Row>
      <Game2Component></Game2Component>
    </Row>
	</Container>
);

export class Game2Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteNumber: 1,
      notesImage: 'images/Notes1_5.png',
      gameOn: false,
      cards: [],
      isDisabled: true,
    }
  }

  showTutorial = () => {
    if(this.state.noteNumber === 1) {
      this.setState({ noteNumber: 2, notesImage: 'images/Notes2_5.png'});
    } else if(this.state.noteNumber === 2) {
      this.setState({ noteNumber: 3, notesImage: 'images/Notes3_5.png'});
    } else if(this.state.noteNumber === 3) {
      this.setState({ noteNumber: 4, notesImage: 'images/Notes4_5.png'});
    } else {
      this.setState({ noteNumber: 1, notesImage: 'images/Notes5_5.png'});
    }
  }

  openGame2 = () => {
		const cards = [
		{id: 0, same: 1, isClicked: false, flipped: "showFront", isMatched: false, isMissmatched: false, matched: "images/crotchetPicMatched.png", image: "images/crotchet.jpg"},
		{id: 1, same: 1, isClicked: false, flipped: "showFront", isMatched: false, isMissmatched: false, matched: "images/crotchetMatched.png", image: "images/crotchetWords.png"},
		{id: 2, same: 2, isClicked: false, flipped: "showFront", isMatched: false, isMissmatched: false, matched: "images/breveMatched.png", image: "images/breveWords.jpg"},
		{id: 3, same: 2, isClicked: false, flipped: "showFront", isMatched: false, isMissmatched: false, matched: "images/brevePicMatched.png", image: "images/breve.png"},
		{id: 4, same: 3, isClicked: false, flipped: "showFront", isMatched: false, isMissmatched: false, matched: "images/crotchetRestMatched.png", image: "images/crotchetRestWords.png"},
		{id: 5, same: 3, isClicked: false, flipped: "showFront", isMatched: false, isMissmatched: false, matched: "images/crotchetRestPicMatched.png", image: "images/crotchetRest.png"},
		];
    this.setState({gameOn: true, cards});
  }

  findKey = (key) => {
    let cards = this.state.cards;
    cards[key].isClicked = true;
    cards[key].flipped = "showBack";
    this.setState({cards});
    this.checkCards();
  }

  checkCards = () => {
    let results = this.state.cards.filter(card => card.isClicked && !card.isMatched);
    if(results.length === 2) {
      for(var i = 0; i < 2; i++) {
        if(results[i].same === results[i+1].same) {
          results[i].isMatched = true;
          results[i+1].isMatched = true;
					break;
        } else {
          results[i].isMissmatched = true;
          results[i+1].isMissmatched = true;
					break;
        }
      }
			setTimeout(() => {
				this.closeCard();
				return;
			},1000);
    }
    this.checkIsAllCardsMatched()
  }

  closeCard = () => {
		var cards = this.state.cards;
    cards.map(card => {
      if(card.isMissmatched){
        card.flipped = "showFront";
        card.isMissmatched = false;
        card.isClicked = false;
      }
     });
		 this.setState({cards});
  }

  checkIsAllCardsMatched = () => {
    let cards = this.state.cards;
		for(var i = 0; i< cards.length; i++) {
			if(!cards[i].isMatched) {
				return;
			}
		}
		this.setState({isDisabled: false});
  }

	displaySrcImage = ({id, flipped, isMatched, image, matched}) => {
    if(flipped === "showFront") {
      return "images/cardMemoryGame.png";
    } else if (isMatched) {
      return matched;
    } else {
      return image;
    }
  }

  showNextButton = () => {
    if(this.state.gameOn) {
      return (
        <button className="nextButton" disabled={this.state.isDisabled} type="submit">Next</button>
      )
    }
  }

  showBackButton = () => {
    if(this.state.gameOn) {
      return (
        <button className="backButton" type="submit" onClick={this.showModal}>Back</button>
      )
    }
  }
  //YOURE HERE 
  showModal = () => {
  console.log('HERE')
    return (
      <>
      <Modal show={true} onHide={true}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>Are you sure you want to go back? You will lose all the progress your progress in the game.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  /*goToTutorial = () => {
    this.setState({gameOn: false});
  }*/

  displayTutorial = () => {
    if (this.state.gameOn === false){
      return (
        <Row>
          <Col>
            <h2 className="intro"> The aim of this game is to match the musical note symbols to their right name, but first we need to learn their names. Click PLAY when you're done. </h2>
          </Col>
          <Row className="align-items-center justify-content-center">
            <Col>
              <Image className="float-left arrow" src="images/leftArrow.png" onClick={this.showTutorial}/>
            </Col>
            <Col className="image-container" lg="auto" md="auto" sm="auto" xs="auto">
              <Image className="noteTutorialImage" src={this.state.notesImage} />
            </Col>
            <Col>
              <Image className="float-right arrow" onClick={this.showTutorial} src="images/rightArrow.png" />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col></Col>
            <Col lg="auto" md="auto" sm="auto" xs="auto">
              <button className="playButton" type="submit" onClick={this.openGame2}>
                PLAY
              </button>
            </Col>
            <Col></Col>
          </Row>
        </Row>
      );
    } else {
      return (
				<Row>
        {this.state.cards.map(card => (
					<Col key={card.id}>
          	<Image key={card.id} onClick={() => this.findKey(card.id)} className={"cardStyle"+card.id+" cardStyle"} src={this.displaySrcImage(card)} />
					 </Col>
          )
        )}
			</Row>
      );
    }
  }

  render() {
    return (
      <Container fluid={true} className="game2Container">
        {this.displayTutorial()}
        {this.showNextButton()}
        {this.showBackButton()}
      </Container>
    );
  }
}


// const condition = authUser => !!authUser;

export default Game2Page;
