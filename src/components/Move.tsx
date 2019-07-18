import * as React from 'react';
//import { Game } from '@rahoi/ch3ss_logic'
import ILocation from '../interfaces/Location';
//import Position from '@rahoi/ch3ss_logic/src/Piece'

interface IState { 
  From: ILocation, 
  To: ILocation 
}

interface IProps {
  move: any
  addStep: any
  test: any
  //possibleMove?: any
}

export default class Move extends React.Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
          From: {
            x: 0,
            y: 0,
            z: 0
          },
          To: {
            x: 0,
            y: 0,
            z: 0
          }
        };
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      public handleChangeFrom(event: { target: { value: any; }; }) {
        this.setState({From: event.target.value});
      }

      public handleChangeTo(event: { target: { value: any; }; }) {
        this.setState({To: event.target.value});
      }
    
      public handleSubmit(event: { preventDefault: () => void; }) {
        // console.log(this.state.From);
        
        // alert('An essay was submitted: ' + this.state.From + ' ' + this.state.To);
        event.preventDefault();
      }

      movePiece = () => {
        let {move, addStep, test} = this.props
        let {From, To} = this.state
        console.log("movePiece in move");
        
        move(From, To)
        addStep()
        test()
      }
    
      public render() {

        // let {move, addStep, test}:any = this.props;

        return (
          <form onSubmit={this.handleSubmit}>
              <div className = "input">
                From:
                <input type = "text"  onChange = {this.handleChangeFrom}/>
                {'   '}
                To:
                <input type = "text"  onChange = {this.handleChangeTo}/>
                <input type="submit" value="Move" onClick = {this.movePiece}/>
              </div>
          </form>
        );
      }
}