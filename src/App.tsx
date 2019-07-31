
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




//看一下怎么用textarea显示一个string array
//movehisory显示移动历史
//两个玩家相互高亮显示
//possibleMove  = game.getPossibleMovesSpace
//

class App extends React.Component {
  state = {
    liveGame: new Game(),
    step: 0,
    possibleMoves: [
      '1, 1, 1',
      '222',
      '333',
      '444'
    ],
    //possibleMoves: liveGame.,
    history: 'history'
  }

  newGame(){
    this.setState({
      liveGame: new Game()
      
    })
  }
  
  move = (from:Location, to:Location) => {
    let {liveGame} = this.state
    //liveGame.newGame();
    //let moveCompleted = liveGame.move(from, to);
    this.setState({liveGame: liveGame})
    console.log("move in app");
    
  }

  

  possible = () => {
    let {liveGame} = this.state
    let possibleMoves = liveGame.getPositionFromString
    this.setState({possibleMoves: possibleMoves})
    
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

  addStep= () => {
    let {step} = this.state
    step++
    this.setState({step: step})
    console.log("test");
    console.log(step);
    
    
  }

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
        
        <Move move = {this.move.bind(this)} addStep = {this.addStep.bind(this)} test = {this.test.bind(this)} />
        <Buttons />
        <PossibleMove possibleMoves = {this.state.possibleMoves} liveGame = {this.state.liveGame} possible = {this.possible.bind(this)}/>
        <History history = {this.state.history}/>
        <What />
        <GGame />
      </div>
    );
  }

}

export default App;
