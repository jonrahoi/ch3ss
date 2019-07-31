import * as React from 'react';
import './App.css';
import History from './components/history';
import PlayerInfo from './components/playerInfo';
import Move from './components/Move';
import Buttons from './components/bottons';
import { Game } from '@rahoi/ch3ss_logic'
import PossibleMove from './components/possibleMove'
import What from './test/what'
import GGame from './components/game'
import possibleMove from './components/possibleMove';
import { string } from 'prop-types';


// list of methods to use
// game1: new Game(1);
/* 
********  moving: ***********
if (game1.isValidSpaceFromString(space from user input from textbox)) && game1.isValidSpaceFromString(space from user input from textbox))  {
  boolean value if move executed = game1.move(game1.getPositionFromString(input1), game1.getPositionFromString(input2));
}
if (boolean = false) {
  message to user "move invalid"
}
if (boolean = true) {
  if (game.getCheckMat()) {
    message to users : "checkmate, Player (whoever's turn it is wins)"
  }
  else if (game.getStalemate()) {
    message to users : "checkmate, Player (whoever's turn it is wins)"
  }
  else if (game.getCheck()) {
    message to users: "Check"
  }
}

******* getPossibleMoves for piece at space **********
get space from user text box
make sure it is a valid space
if (isValidSpaceFromString)
list of moves = game.getPossibleMovesForPieceAtSpace(input)


****** whoseTurnItIs *************
string for black or white = game.getWhoseTurnItIs();


******** move history *************
moves = game.getMoveHistory();
for (var i = 0; i < moveHistory.length; i++) {
  string space = moves[i].getPositionString();
  if (i % 4 == 0) {
    space A White
  }
  if (i % 4 == 1) {
    space B White
  }
  if (i % 4 == 2) {
    space A Black
  }
  if (i % 4 == 3) {
    space B Black
  }

}
*/



class App extends React.Component {
  //pieces, spaces, selectedPiece, selectedSpace, setSelectedSpace
  state = {
    liveGame: new Game(1),
    step: 0,
    possibleMoves: [
      ''
    ],
    //possibleMoves: liveGame.,
    //whosTurn: string,   //return black or white
    player: 'White',
    //thereischeck, checkmate,stalmate

    history: [
      ''
    ],

    // Give to threejs
    pieces: new Game(1).getPieces,   //update at move
    // spaces: [          here I should just pass the possible move as spaces
    //   ''
    // ],
    selectedPiece: '',
    selectedSpace: '',
    camera: 'white'
    //setSelectedSpace: ''
  }

  // setSelectedPiece(){
  //   this.setState({})
  // }

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
  // newGame() {
  //   this.setState({
  //     //liveGame: new Game(1)
  //     liveGame: this.newGame()

  //   })
  // }

  // whoseTurn = () => {
  //   let {liveGame} = this.state
  //   let player = liveGame.getWhoseTurnItIs
  //   this.setState({player: player})
  // }

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
    console.log("move in app");

  }

  getHistory = () => {
    let { liveGame } = this.state;
    let histories = liveGame.getMoveHistory();
    let history: string[] = [];
    console.log("history length#####################: "+histories.length);
    console.log(histories);
    
    for (let i = 0; i < histories.length; i++) {
      history.push(histories[i].getPostionString());
      console.log(histories[i].getPostionString());
      console.log("history value in app loop: "+history);
      
      
    }
    console.log("history in app" + history);

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
    //let test: string = ""+from+""
    //console.log("Test from string in app: "+test);
    //console.log("From string in app: "+from.toString());
    console.log("from value in app" + from);
    console.log("type of from in app" + typeof (from));
    if (from === '111') {
      console.log('nmd');

    }


    let a: string = from
    
    let possibleSpaceStringArray: string[] = [];
    //console.log("possitions type" + typeof (possiblePossitions));
    console.log("user input from in app: " + from);
    console.log("in app possible boolean"+liveGame.validSpace(liveGame.getPositionFromString(from)));
    
    if (liveGame.validSpace(liveGame.getPositionFromString(from))) {
      // if (possiblePossitions.length == 0) {
      //   console.log("pipipipi");

      //   return;
      // }
      let possiblePossitions = liveGame.getPossibleMovesForPieceAtSpace(liveGame.getPositionFromString(from));
      console.log("poss in app: " + possiblePossitions);
      
      for (let i = 0; i < possiblePossitions.length; i++) {
        console.log(possiblePossitions[i].getPostionString());
        
        //possibleSpaceStringArray.push(possiblePossitions[i].getPostionString());
      }
    }
    else {
      alert('Check your input')
    }
    this.setState({ possibleMoves: possibleSpaceStringArray })



    // let space = new Position;
    // let possiblePossitions = liveGame.getPossibleMovesForPieceAtSpace(space);
    // let possibleSpaceStringArray: string[] = []
    // for(let i = 0; i < possiblePossitions.length; i++) {
    //   possibleSpaceStringArray.push(possiblePossitions[i].getPostionString());
    // }
    // let possibleMoves = liveGame.getPositionFromString
    // this.setState({possibleMoves: possibleMoves})

  }

  // possibleMoves = () => {
  //   //I give you a location, please give me an array of string

  //   let moves = [
  //     '111',
  //     '222',
  //     '333'
  //   ]
  //   this.setState({possibleMoves: moves})
  // }

  // addStep= () => {
  //   let {step} = this.state
  //   step++
  //   this.setState({step: step})
  //   console.log("test");
  //   console.log(step);


  // }

  test = () => {
    // let {count} = this.state
    // count++
    // this.setState({count: count})


    // console.log("addCount"+count);

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
