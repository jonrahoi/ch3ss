import * as React from 'react';
import {Game} from '@rahoi/ch3ss_logic';

export default class Counter extends React.Component {
  state = {
    count: 0
  };

  increment = () => {
    // instantiate the game
    console.log(Game)
    const g = new Game()
    console.log(g)

    this.setState({
      count: (this.state.count + 1)
    });
  };

  decrement = () => {
    this.setState({
      count: (this.state.count - 1)
    });
  };

  render () {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}