import * as React from 'react';

export default class PlayerInfo extends React.Component{
    public render(){
        
        return (
            <div className = "buttons">
                <div className = "control">
                    <button>Preset</button>
                    <button>Start</button>
                    <button>Twist</button>
                    <button>Spin</button>
                    <button>Rotest</button>
                </div>
                <div className = "new">
                    <button>New</button>
                </div>
            </div>
            

            
        )
        
        
    }
}