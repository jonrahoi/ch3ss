import React, { Component } from 'react'

interface IProps {
    possibleMoves: any
    liveGame: any
    possible: any
}

interface IState {
}
const ButtonName = (): any => {
    return (
        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Possible Moves
        </button>
    )
}

const MoveItem = (props: any): any => {
    let result = ReptileListItems(props)
    return (
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {result}
        </div>
    )
}

function ReptileListItems(props: any) {
    const reptiles = props.possibleMoves;
    return reptiles.map((reptile: React.ReactNode) => (
        <a className="dropdown-item" href="#">
            {reptile}
        </a>
    ));
}

export default class possibleMove extends Component<IProps, IState> {
    render() {
        return (
            <div className="dropdown">
                <ButtonName />
                <MoveItem possibleMoves={this.props.possibleMoves} />
            </div>
        )
    }
}
