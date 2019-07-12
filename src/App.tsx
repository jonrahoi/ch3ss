import * as React from 'react';
import './App.css';
import History from './components/history';
import PlayerInfo from './components/playerInfo';
import PossibleMoves from './components/possibleMoves';
import Buttons from './components/bottons';
import Ch3ss from './components/ch3ss';
import Input from './test/input'
import newInput from './test/newInput'
import { Game } from '@rahoi/ch3ss_logic'

//test only
import Counter from './test/Counter'

interface Pos{x:number, y:number, z:number}

interface MyComponentProps { }
interface MyComponentState { liveGame: Game }

class App extends React.Component<MyComponentProps, MyComponentState> {
  constructor(props:any) {
    super(props)
    this.state = {liveGame: new Game()}
  }
  newGame(){
    this.setState({liveGame: new Game()})
  }
  move(from:Pos, to:Pos){
    const g = this.state.liveGame
    // g.move(from, to)
    this.setState({liveGame: g})
  }
  // this.setState({ username: 'rstacruz' })
  public render() {
    return (

      <div className="App">
        <PlayerInfo game={this.state.liveGame} createGame={this.newGame.bind(this)}/>
        <History />
        <PossibleMoves />
        <Buttons />
        <Ch3ss />
        {/* test only */}
        <Counter />
        <Input />
        {/* <newInput /> */}
      </div>
    );
  }
}

export default App;
