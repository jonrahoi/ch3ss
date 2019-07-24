import * as React from 'react';
import './App.css';
import History from './components/history';
import PlayerInfo from './components/playerInfo';
import Move from './components/Move';
import Buttons from './components/bottons';
//import Ch3ss from './components/ch3ss';
import Location from './interfaces/Location'
import { Game } from '@rahoi/ch3ss_logic'
import PossibleMove from './components/possibleMove'
// import {Button} from 'antd'
// import 'antd/dist/antd.css';
import What from './test/what'
import GGame from './components/game'
import possibleMove from './components/possibleMove';
import { string } from 'prop-types';
//import { Position } from '@rahoi/ch3ss_logic/src/Piece';


//看一下怎么用textarea显示一个string array
//movehisory显示移动历史
//两个玩家相互高亮显示
//possibleMove  = game.getPossibleMovesSpace
//


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
    player: 'black',
    //thereischeck, checkmate,stalmate

    history: 'history',
    
    // Give to threejs
    pieces: [],
    spaces: [],
    selectedPiece: '',
    selectedSpace: '',
    setSelectedSpace: ''
  }

  // setSelectedPiece(){
  //   this.setState({})
  // }


  newGame() {
    this.setState({
      //liveGame: new Game(1)
      liveGame: this.newGame()

    })
  }

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
      if (liveGame.getCheckMate) {
        alert("Checkmate, Player: " + player)
      }
      else if (liveGame.getStaleMate) {
        alert("Checkmate, Player: " + player)
      }
      else if (liveGame.getCheck) {
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

    for (let i = 0; i < histories.length; i++) {
      history.push(histories[i].getPostionString());
    }
    console.log("history in app" + history);

    this.setState({ history: history })
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
    let possiblePossitions = liveGame.getPossibleMovesForPieceAtSpace(liveGame.getPositionFromString(from));
    let possibleSpaceStringArray: string[] = [];
    console.log("possitions type" + typeof (possiblePossitions));
    if (liveGame.validSpace(liveGame.getPositionFromString(from))) {
      if (possiblePossitions.length === undefined) {
        console.log("pipipipi");

        return;
      }
      for (let i = 0; i < possiblePossitions.length; i++) {
        possibleSpaceStringArray.push(possiblePossitions[i].getPostionString());
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
        <PlayerInfo game={this.state.liveGame} step={this.state.step} />
        <Move move={this.move.bind(this)} possible={this.possible.bind(this)} history={this.getHistory.bind(this)} />
        <Buttons />
        <PossibleMove possibleMoves={this.state.possibleMoves} liveGame={this.state.liveGame} possible={this.possible.bind(this)} />
        <History history={this.state.history} />
        <What />
        {/* <GGame possibleMove = {this.state.possibleMoves} pieces = {this.state.pieces}/> */}
      </div>
    );
  }
}

export default App;
