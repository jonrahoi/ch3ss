import * as React from 'react';

export default class PossibleMoves extends React.Component<{},{value: any}>{
    constructor(props: any) {
        super(props);
        this.state = {
          value: 'Possible moves'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      public handleChange(event: { target: { value: any; }; }) {
        this.setState({value: event.target.value});
      }
    
      public handleSubmit(event: { preventDefault: () => void; }) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
      public render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <div className = "input">
                From:
                <input type = "text" />
                {'   '}
                To:
                <input type = "text" />
                <input type="submit" value="Submit" />
              </div>
            
            <label>
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
          </form>
        );
      }
}