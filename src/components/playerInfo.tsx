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
  }

export default class PlayerInfo extends React.Component<IProps, IState>{
    public render(){
        // let {game, createGame} = this.props;

        return (
            <div>
                <button className="btn btn-info" disabled = {true}>player1</button>
                <button className="btn btn-info" disabled = {true}>player2</button>
            </div>
        )


    }
}