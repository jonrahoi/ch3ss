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
    //liveGame: new Game(),
    //liveGame: this.newGame(),
    liveGame: new Game(1),
    step: 0,
    possibleMoves: [
      '1, 1, 1',
      '222',
      '333',
      '444'
    ],
    //possibleMoves: liveGame.,
    //getwhosturn   return black or white
    player: 'black',
    //thereischeck, checkmate,stalmate
    
    history: 'history',
    selectedPiece:'',
    selectedSpace: '',
    pieces:[]
  }

  // setSelectedPiece(){
  //   this.setState({})
  // }


  newGame(){
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
  
  move = (from:Location, to:Location) => {
    let {liveGame} = this.state
    //liveGame.newGame();
    //let moveCompleted = liveGame.m;
    //const space = new Position(1, 2, 1);
    liveGame.move(liveGame.getPositionFromString("111"), liveGame.getPositionFromString("121"));
    let possiblePossitions = liveGame.getPossibleMovesForPieceAtSpace(liveGame.getPositionFromString("111"));
    console.log("possible in app move"+possiblePossitions);
    
    //let possibleSpaceStringArray: string[] = [];
    // for (let i = 0; i < possiblePossitions.length; i++){
    //   possibleSpaceStringArray.push(possiblePossitions[i].getPostionString());
    // }
    console.log("bbb");
    
    //console.log(possibleSpaceStringArray);
    
    this.setState({liveGame: liveGame})
    console.log("move in app");
    
  }

  // getHistory = () => {
  //   let {liveGame} = this.state;
  //   let histories= liveGame.getMoveHistory();
  //   let history: Position[] = [];
  //   for (let i = 0; i < histories.length; i++) {
  //     history.push(histories[i].getPostionString());
  //   }
  // }

  

  possible = () => {
    let {liveGame} = this.state
    // let space = new Position;
    // let possiblePossitions = liveGame.getPossibleMovesForPieceAtSpace(space);
    // let possibleSpaceStringArray: string[] = []
    // for(let i = 0; i < possiblePossitions.length; i++) {
    //   possibleSpaceStringArray.push(possiblePossitions[i].getPostionString());
    // }
    // let possibleMoves = liveGame.getPositionFromString
    // this.setState({possibleMoves: possibleMoves})
    console.log('kkkk');
    
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
        <PlayerInfo game={this.state.liveGame} step = {this.state.step}/>        
        <Move move = {this.move.bind(this)} possible = {this.possible.bind(this)} />
        <Buttons />
        <PossibleMove possibleMoves = {this.state.possibleMoves} liveGame = {this.state.liveGame} possible = {this.possible.bind(this)}/>
        <History history = {this.state.history}/>
        <What />
        <GGame possibleMove = {this.state.possibleMoves} pieces = {this.state.pieces}/>
      </div>
    );
  }
}

export default App;
