import * as React from 'react';
//import { Game } from '@rahoi/ch3ss_logic'
//import Possition from '../interfaces/Location';
//import Position from '@rahoi/ch3ss_logic/src/Piece'

interface IState { 
  From: string, 
  To: string 
}

interface IProps {
  move: any
  possible: any
  history: any
  //addStep: any
  //test: any
  //possibleMove?: any
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
        this.setState({From: event.target.value});
        var a: string = event.target.value
        //console.log(a+"  "+a.length);
        //console.log(typeof(this.state.From));
        
        //console.log("movePiece in move");
        //console.log("type in move: " + typeof(this.state.From));
        
        if (a.length == 3) {
          this.props.possible(a);
          //this.props.history();
          
        }
        
        //this.props.possible
        //console.log(this.state.From);
        
      }

      public handleChangeTo(event: { target: { value: any; }; }) {
        this.setState({To: event.target.value});
      }
    
      public handleSubmit(event: { preventDefault: () => void; }) {
        // console.log(this.state.From);        
        // alert('An essay was submitted: ' + this.state.From + ' ' + this.state.To);
        this.props.move(this.state.From, this.state.To)
        let after: string = ''
        this.setState({From: after})
        this.setState({From: ''})
        console.log("after reset From: " + this.state.From);
        
        this.setState({To: ''})
        event.preventDefault();
      }

      movePiece = () => {
        let {move, history} = this.props
        let {From, To} = this.state
        
        
        //move(From, To)
        history()
        console.log('after use history in move');
        
        
      }
    
      public render() {

        // let {move, addStep, test}:any = this.props;

        return (
          <form onSubmit={this.handleSubmit}>
              <div className = "input">
                From:
                <input type = "text"  value = {this.state.From} onChange = {this.handleChangeFrom}/>
                {'   '}
                To:
                <input type = "text" value = {this.state.To} onChange = {this.handleChangeTo}/>
                <input type="submit" value="Move" onClick = {this.movePiece}/>
              </div>
          </form>
        );
      }
}