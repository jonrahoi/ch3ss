import * as React from 'react';
import { Drawer, Button } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';

interface IState {

}
interface IProps {
    setCamera: any
    setNewGame: any
    player: string
}
export default class Buttons extends React.Component<IProps, IState>{
    state = { visible: false };

    /**
     * This will set a value of visible variable 
     */
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    /**
     * This will set a value of visible variable 
     */
    onClose = () => {
        this.setState({
            visible: false,
        });
    };




    // clickOnBlack = () => {
    //     let { setCamera } = this.props
    //     setCamera('black')
    // }
    // clickOnWhite = () => {
    //     let { setCamera } = this.props
    //     setCamera('white')
    // }

    /**
     * Reset liveGame in app.tsx
     */
    clickOnNewGame = () => {
        let { setNewGame } = this.props
        setNewGame()
    }

    /**
     * Show resign and create a new game
     */
    clickOnResignation = () => {
        let {setNewGame, player} = this.props
        alert(player+', you lose! New game start')
        setNewGame();
    }

    /**
     * Show draw and create a new game
     */
    clickOnDraw = () => {
        let {setNewGame, player} = this.props
        alert('Draw!')
        setNewGame();
    }

    // clickOnSave = () => {
    //     let {saveGame} = this.props
    //     saveGame()
    // }
    public render() {

        return (
            <div className="bu">
                {/* <div className="version">
                    <button onClick={this.clickOnBlack}>Black Version</button>
                    <button onClick={this.clickOnWhite}>White Version</button>
                </div> */}
                <div className = "Resignation" >
                    <Button type="primary" onClick = {this.clickOnResignation}>Resign</Button>
                </div>
                <div className="Draw" >
                    <Button onClick={this.clickOnDraw} type="primary">Draw</Button>
                </div>
                <div className="newGame" >
                    <Button onClick={this.clickOnNewGame} type="primary">New Game</Button>
                </div>
                
                {/* <div className="Save" >
                    <Button onClick={this.clickOnSave} type="primary">Save</Button>
                </div> */}
                {/* <div className="newGame" >
                    <Button onClick={this.clickOnNewGame} type="primary">New Game</Button>
                </div>
                <div className="newGame" >
                    <Button onClick={this.clickOnNewGame} type="primary">New Game</Button>
                </div> */}
                <p> </p>
                <div className="rules">
                    <Button type="primary" onClick={this.showDrawer}>
                        Rules
                    </Button>
                    <Drawer className="rules"
                        title="Game Rules"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <p>Unicorn: Moves through corners of cells</p>
                        <p>Rook: Moves through faces of cells</p>
                        <p>Knight: Moves through one face, and one edge</p>
                        <p>Bishop: Moves through edges of cells</p>
                        <p>Queen: Bishop, Unicorn, and Rook movements combined</p>
                        <p>Unicorn: Moves through corners of cells</p>
                        <p>King:  Any adjacent space, through edge, corner, or face</p>
                        <p>Pawn: Moves up towards the far edge (up/down and across), captures diagonally forward or diagonally forward up/down, "queened" if reaches one of the opponent's two back rows</p>
                    </Drawer>
                </div>
                <p> </p>

                
            </div>



        )


    }
}