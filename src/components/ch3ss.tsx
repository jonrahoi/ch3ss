import * as React from 'react';
import Input from './possibleMoves'
import { any } from 'prop-types';
import Location from '../interfaces/Location'
//try to get parameter from input and console.log here, then you can create an game object and use in here

// interface ILocation {
//     x: number,
//     y: number,
//     z: number
// }

export default class PlayerInfo extends React.Component{
    constructor(props: any) {
        super(props);
        this.state = {
            From: Location,
            To: Location
        }
    }
    public render(){
        // const player1: IUser = {name: 'Player1'};
        // const player2: IUser = {name: 'Player2'};
        
        return (
            <div>
                <svg />
            </div>
        )
        
        
    }
}