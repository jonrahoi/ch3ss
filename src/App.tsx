import * as React from 'react';
import './App.css';
import History from './components/history';
import PlayerInfo from './components/playerInfo';
import Move from './components/Move';
import Buttons from './components/bottons';
import { Game } from '@rahoi/ch3ss_logic'
import PossibleMove from './components/possibleMove'
import GGame from './components/game'
import { Position } from '@rahoi/ch3ss_logic'

/**
 * theGame: this is an object of game logic, so this is where we play the game
 */
let theGame = new Game(1)

/**
 * This is a react class, we implement react in here
 */
class App extends React.Component {
  /**
   * liveGame: liveGame is the game logic object we are playing
   * possibleMove: Array of string, it store a list of possible move for a selected piece
   * player: Player of now turn
   * history: History of player moves
   * pieces: An array of position(class create in logic part), show the position of each pieces
   */
  state = {
    liveGame: theGame,
    possibleMoves: [
      ''
    ],
    player: 'White',
    history: [
      ''
    ],
    pieces: theGame.getPieces(),   //update at move
    // selectedPiece: '',
    // selectedSpace: '',
    // camera: 'white',
    // newGame: '',
    // From: '',
    // To: ''
  }

  // setFromAndTo = (a: string, b: string) => {
  //   this.setState({
  //     From: a,
  //     To: b
  //   })
  // }
  // saveGame = () => {
  //   let { liveGame } = this.state
  //   liveGame.saveGameToFile("./game1.json")
  // }

  // setLiveGame = (liveGame: any) => {
  //   this.setState({
  //     liveGame: liveGame
  //   })
  // }

  // test1 = () => {
    
  //   console.log(false + " in");
    
  // }

  
  // setNewGameState = () => {
  //   this.setState({
  //     newGame: 'new'
  //   })
  // }

  /**
   * Clear possible moves
   */
  resetPossibleMove = () => {
    this.setState({
      possibleMoves: [
        ''
      ]
    })
}

  // setCamera = (camera: string) => {
  //   this.setState({ camera: camera })
  // }

  /**
   * Clear state when create a new game
   */
  setNewGame = () => {
    //this.setNewGameState()
    theGame = new Game(1)
    this.setState({
      liveGame: theGame,
      possibleMoves: [
        ''
      ],
      player: 'White',
      history: [
        ''
      ],
      pieces: theGame.getPieces,   //update at move
      selectedPiece: '',
      selectedSpace: '',
      camera: 'white'
    })
    window.location.reload();
  }


  /**
   * Use to update pieces position after move
   */
  setPieces = () => {
    let { liveGame } = this.state
    this.setState({ pieces: liveGame.getPieces() })
  }
  
  // setSelectedPiece = (selectedPiece: string) => {
  //   this.setState({ selectedPiece: selectedPiece })
  // }

  // setSelectedSpace = (selectedPiece: string) => {
  //   this.setState({ selectedPiece: selectedPiece })
  // }

  /**
   * Move pieces in liveGame. It call a method in logic "move", this function will check vailed of move, checkmate, stalemate and check
   */
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
        alert("Checkmate, Player: " + player + " end of the game")        
      }
      else if (liveGame.getCheck()) {
        alert("Check!")
      }
      else if (liveGame.getStaleMate()) {
        alert("StaleMate end of game")
      }
    }
    this.setState({ liveGame: liveGame })
  }


  /**
   * Get history of current step
   */
  getHistory = () => {
    let { liveGame } = this.state;
    let histories = liveGame.getMoveHistory();
    let history: string[] = [];
    for (let i = 0; i < histories.length; i++) {
      history.push(histories[i].getPostionString());
    }
    this.setState({ history: history })
  }

  /**
   * This will update state.player to whose turn
   */
  setPlayer = () => {
    let { liveGame } = this.state
    this.setState({ player: liveGame.getWhoseTurnItIs() })
  }

  possible = (from: string) => {
    let { liveGame } = this.state
    let f = new Position(Number.parseInt(from.charAt(0)), Number.parseInt(from.charAt(1)), Number.parseInt(from.charAt(2)))
    let possibleSpaceStringArray: string[] = [];
    let possiblePossitions = liveGame.getPossibleMovesForPieceAtSpace(f);
    if (liveGame.validSpace(f) && possiblePossitions != undefined) {
      for (let i = 0; i < possiblePossitions.length; i++) {
        possibleSpaceStringArray.push(possiblePossitions[i].getPostionString());
      }
    }
    else {
      alert('Check your input')
    }
    this.setState({ possibleMoves: possibleSpaceStringArray })
  }

  // test = () => {
  //   alert("in test")
  //   console.log("in test");
    
  // }

  /**
   * PlayerInfo: Contain two button of white, black and a sign of finger to indicate whose turn
   * Move: Contain a form of two input area and a submit button. Input area is use to get position of from and to and call some functions defined in this class.
   * Button: contain buttons of resign, draw, new game and rules
   * PossibleMove: Contain a button to show possible moves
   * History: It's a table to show history
   */
  public render() {
    console.log(this.state.liveGame.getBoardStateStringArray());
    const s = this.state
    return (
      <div className="App">
        <PlayerInfo game={s.liveGame} player={s.player} />
        <Move move={this.move.bind(this)} possible={this.possible.bind(this)} history={this.getHistory.bind(this)} setPlayer={this.setPlayer.bind(this)} setPieces={this.setPieces.bind(this)} resetPossibleMove={this.resetPossibleMove.bind(this)} />
        <Buttons setCamera={this.setPlayer.bind(this)} setNewGame={this.setNewGame.bind(this)} player={s.player} />
        <PossibleMove possibleMoves={s.possibleMoves} liveGame={s.liveGame} possible={this.possible.bind(this)} />
        <History history={s.history} liveGame={s.liveGame} />
        {/* <What /> */}
        {/* pieces, spaces, selectedPiece, selectedSpace, setSelectedSpace setSelectedPiece*/}
        {/* <GGame spaces={s.possibleMoves} pieces={s.pieces} setSelectedPiece={this.setSelectedPiece.bind(this)} setSelectedSpace={this.setSelectedSpace.bind(this)} camera={s.camera} liveGame = {s.liveGame}/> */}
        {/* <GGame setLiveGame = {this.setLiveGame.bind(this)} newGame = {s.newGame} test = {this.test.bind(this)}/> */}
        {/* <GGame key = {Math.random()} setLiveGame = {this.setLiveGame.bind(this)} test = {this.test.bind(this)} liveGame = {s.liveGame} setNewGame={this.setNewGame.bind(this)} pieces = {s.pieces} num = {1} setFromAndTo = {this.setFromAndTo.bind(this)}/> */}
        <GGame key = {Math.random()} pieces = {s.pieces} liveGame = {s.liveGame}/>
      </div>
    );
  }
}

export default App;
