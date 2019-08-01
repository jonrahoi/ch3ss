import * as React from 'react';
import { Drawer, Button } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';


interface IState {
  From: string,
  To: string
}

interface IProps {
  move: any
  possible: any
  history: any
  setPlayer: any
  setPieces: any
  resetPossibleMove: any
}

export default class Move extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props);
    this.state = {
      From: '',
      To: ''
    };
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChangeFrom(event: { target: { value: any; }; }) {
    this.setState({ From: event.target.value });
    var a: string = event.target.value
    if (a.length == 3) {
      this.props.possible(a);
    }
  }

  public handleChangeTo(event: { target: { value: any; }; }) {
    this.setState({ To: event.target.value });
  }

  public handleSubmit(event: { preventDefault: () => void; }) {
    let { setPlayer, setPieces, resetPossibleMove } = this.props
    this.props.move(this.state.From, this.state.To)
    let after: string = ''
    this.setState({ From: after })
    this.setState({ From: '' })
    resetPossibleMove()
    this.setState({ To: '' })
    setPieces()
    setPlayer()
    event.preventDefault();
  }

  movePiece = () => {
    let { move, history, resetPossibleMove } = this.props
    let { From, To } = this.state
    history()
    resetPossibleMove()
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input">
          From:
                <input type="text" value={this.state.From} onChange={this.handleChangeFrom} />
          {'   '}
          To:
                <input type="text" value={this.state.To} onChange={this.handleChangeTo} />
          <input type="submit" value="Move" onClick={this.movePiece} />
        </div>
      </form>
    );
  }
}