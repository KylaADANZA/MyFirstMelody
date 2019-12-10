import React, { Component } from 'react';
import Sound from 'react-sound';
import wavFile from './my-sounds/bNote.mp3';
 
class MySound extends React.Component {
    render() {

        var audio = new Audio("./bNote.wav")
    
        return (
          <Container>
                <img src={images/noteB.png} onClick={ () => audio.play() }/>
          </Container>
        );
      }
}


export default MySound;