import * as React from 'react';
//import {Game} from '@rahoi/ch3ss_logic'

// interface IUser {
//     name?: string
// }

// interface MyComponentProps { 
//     game: Game, 
//     createGame: ()=>void 
// }
// interface MyComponentState { user :  IUser }

interface IState {

}

interface IProps {
  game: any,
  step: number,
  createGame?: any
  player: any
}

export default class PlayerInfo extends React.Component<IProps, IState>{
  public render() {
    // let {game, createGame} = this.props;
    let {player} = this.props
    let flag1: string
    let flag2: string
    console.log("Player Color in playerinfo: "+player);
    
    if (player == 'White') {
      flag1 = 'visable'
      console.log("is white in playerinfo");
      
    }
    else {
      flag1 = 'hidden'
    }
    if (player == 'Black') {
      flag2 = 'visable'
    }
    else {
      flag2 = 'hidden'
    }
    return (
      <div className = "palyerInfo">
        <div  style = {{display: 'block'}}>
          <button className="btn btn-info" disabled={true} style = {{display: 'inline'}}>player1</button>
          {/* <svg visibility = {flag1}> */}
          {/* <svg style = {{visibility: 'visible'}}>
            Your turn
            </svg> */}
            <p style = {{visibility: 'hidden'}}>
            Your turn
            </p>
        </div>
        <div>
          <button className="btn btn-info" disabled={true}>player2</button>
          <svg >
            Your turn
             </svg>
        </div>
      </div>
    )


  }
}