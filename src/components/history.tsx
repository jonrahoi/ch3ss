import * as React from 'react';

export default class History extends React.Component<{},{value: any}>{
    constructor(props: any) {
        super(props);
        this.state = {
          value: 'move history'
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
            <label>
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            {/* <input type="submit" value="Submit" /> */}
          </form>
        );
      }
}