import * as React from 'react';

interface IUser {
    name?: string
}

export default class PlayerInfo extends React.Component<IUser>{
    constructor(props: IUser) {
        super(props);
    }
    

    public render(){
        // const player1: IUser = {name: 'Player1'};
        // const player2: IUser = {name: 'Player2'};
        
        return (
            <div>
                <p className = "playerInfo">
                    player1
                </p>
                <p className = "playerInfo">
                    player2
                </p>
            </div>
        )
        
        
    }
}