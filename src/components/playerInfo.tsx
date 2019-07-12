import * as React from 'react';
import {Game} from '@rahoi/ch3ss_logic'

interface IUser {
    name?: string
}

interface MyComponentProps { game: Game, createGame: ()=>void }
interface MyComponentState { user :  IUser }

export default class PlayerInfo extends React.Component<MyComponentProps, MyComponentState>{

    public render(){
        // const player1: IUser = {name: 'Player1'};
        // const player2: IUser = {name: 'Player2'};

        return (
            <div>
                <p className = "playerInfo">
                    {this.props.game}
                </p>
                <p className = "playerInfo" onClick={this.props.createGame}>
                    player2
                </p>
            </div>
        )


    }
}