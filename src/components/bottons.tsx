import * as React from 'react';

export default class Buttons extends React.Component{
    public render(){
        
        return (
            <div>
                <div className = "version">
                    <button>Black Version</button>
                    <button>White Version</button>
                    
                </div>

                <div className = "newGame">
                    <button>New Game</button>
                </div>

                <div className = "rules">
                    <button>Rules</button>
                </div>
            </div>
            

            
        )
        
        
    }
}