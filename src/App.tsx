import * as React from 'react';
import './App.css';
import History from './components/history';
import PlayerInfo from './components/playerInfo';
import Move from './components/Move';
import Buttons from './components/bottons';
import { Game } from '@rahoi/ch3ss_logic'
import PossibleMove from './components/possibleMove'
import GGame from './components/game'


class App extends React.Component {
  state = {
    liveGame: new Game(1),
    step: 0,
    possibleMoves: [
      ''
    ],
    player: 'White',
    history: [
      ''
    ],

    // Give to threejs
    pieces: new Game(1).getPieces,   //update at move
    selectedPiece: '',
    selectedSpace: '',
    camera: 'white'
  }

  resetPossibleMove = () => {
    this.setState({
      possibleMoves: [
        ''
      ]
    })
    console.log('after reset move: ' + this.state.possibleMoves);

  }
  setCamera = (camera: string) => {
    this.setState({ camera: camera })
  }

  setNewGame = () => {
    this.setState({
      liveGame: new Game(1),
      possibleMoves: [
        ''
      ],
      player: 'White',
      history: [
        ''
      ],
      pieces: new Game(1).getPieces,   //update at move
      selectedPiece: '',
      selectedSpace: '',
      camera: 'white'
    })
  }

  setPieces = () => {
    let { liveGame } = this.state
    this.setState({ pieces: liveGame.getPieces() })
  }
  setSelectedPiece = (selectedPiece: string) => {
    this.setState({ selectedPiece: selectedPiece })
  }         //this is new function you should tell to Ahamd

  setSelectedSpace = (selectedPiece: string) => {
    this.setState({ selectedPiece: selectedPiece })
  }

  move = (from: number, to: number) => {
    let { liveGame } = this.state
    let player: string = liveGame.getWhoseTurnItIs();
    let flag: boolean = false;
    flag = liveGame.move(liveGame.getPositionFromString(String(from)), liveGame.getPositionFromString(String(to)))
    if (!flag) {
      alert("Move Invalid")
    }
    else {
      this.getHistory()
      if (liveGame.getCheckMate()) {
        alert("Checkmate, Player: " + player)
      }
      else if (liveGame.getStaleMate()) {
        alert("Checkmate, Player: " + player)
      }
      else if (liveGame.getCheck()) {
        alert("Check!")
      }
    }
    this.setState({ liveGame: liveGame })
    }

  getHistory = () => {
    let { liveGame } = this.state;
    let histories = liveGame.getMoveHistory();
    let history: string[] = [];
    for (let i = 0; i < histories.length; i++) {
      history.push(histories[i].getPostionString());
    }
    this.setState({ history: history })
  }

  setPlayer = () => {
    let { liveGame } = this.state
    this.setState({ player: liveGame.getWhoseTurnItIs() })
    console.log('whosturn in app: ' + this.state.player);

  }

  possible = (from: string) => {
    console.log("type in app:" + typeof (from));

    let { liveGame } = this.state
    console.log("from value in app" + from);
    console.log("type of from in app" + typeof (from));

    let a: string = from
    
    let possibleSpaceStringArray: string[] = [];
    console.log("user input from in app: " + from);
    console.log("in app possible boolean"+liveGame.validSpace(liveGame.getPositionFromString(from)));
    
    if (liveGame.validSpace(liveGame.getPositionFromString(from))) {
      let possiblePossitions = liveGame.getPossibleMovesForPieceAtSpace(liveGame.getPositionFromString(from));      
      for (let i = 0; i < possiblePossitions.length; i++) {
        possibleSpaceStringArray.push(possiblePossitions[i].getPostionString());
      }
    }
    else {
      alert('Check your input')
    }
    this.setState({ possibleMoves: possibleSpaceStringArray })
  }

  public render() {
    return (
      <div className="App">
        <PlayerInfo game={this.state.liveGame} step={this.state.step} player={this.state.player} />
        <Move move={this.move.bind(this)} possible={this.possible.bind(this)} history={this.getHistory.bind(this)} setPlayer={this.setPlayer.bind(this)} setPieces={this.setPieces.bind(this)} resetPossibleMove={this.resetPossibleMove.bind(this)} />
        <Buttons setCamera={this.setPlayer.bind(this)} setNewGame={this.setNewGame.bind(this)} player = {this.state.player}/>
        <PossibleMove possibleMoves={this.state.possibleMoves} liveGame={this.state.liveGame} possible={this.possible.bind(this)} />
        <History history={this.state.history} liveGame={this.state.liveGame} />
        {/* <What /> */}
        {/* pieces, spaces, selectedPiece, selectedSpace, setSelectedSpace setSelectedPiece*/}
        <GGame spaces={this.state.possibleMoves} pieces={this.state.pieces} setSelectedPiece={this.setSelectedPiece.bind(this)} setSelectedSpace={this.setSelectedSpace.bind(this)} camera={this.state.camera} />
      </div>
    );
  }
}

export default App;
