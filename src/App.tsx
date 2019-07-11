import * as React from 'react';
import './App.css';
import History from './components/history';
import PlayerInfo from './components/playerInfo';
import PossibleMoves from './components/possibleMoves';
import Buttons from './components/bottons';
import Ch3ss from './components/ch3ss';
import Input from './test/input'
import newInput from './test/newInput'

//test only
import Counter from './test/Counter'

class App extends React.Component {
  public render() {
    return (
      
      <div className="App">
        <PlayerInfo/>
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
