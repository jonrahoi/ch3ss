import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Input, Tooltip } from 'antd';
import { any } from 'prop-types';


class NumericInput extends React.Component<{onChange: any, value: any, onBlur?: any, style: any}> {
  onChange = (e: any) => {
    const { value } = e.target;
    //const reg = /^([1-5])(\,[1-5])$/;
    const reg = /^[1-5]{0,3}$$/;
    //const reg = /^-?(0|[1-9][0-9]*)(\,[1-5]*)?$/;
    if (( reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  // onBlur = (value: any) => {
  //   const { value: any, onBlur, onChange } = this.props;
  //   if (value.charAt(value.length - 1) === '.' || value === '-') {
  //     onChange(value.slice(0, -1));
  //   }
  //   if (onBlur) {
  //     onBlur();
  //   }
  // };

  render() {
    const { value } = this.props;
    // const title = value ? (
    //   <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
    // ) : (
    //   'Input a number'
    // );
    return (
      // <Tooltip
      //   //trigger={['focus']}
      //   //title={title}
      //   //placement="topLeft"
      //   //overlayClassName="numeric-input"
      // >
        <Input
          {...this.props}
          onChange={this.onChange}
          //onBlur={this.onBlur}
          placeholder="Input a number"
          maxLength={25}
        />
      // </Tooltip>
    );
  }
}

export default class NumericInputDemo extends React.Component <{value?: any, style?: any},{value:any}>{
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
  }

  onChange = (value: any) => {
    this.setState({ value });
  };

  render() {
    return (
      <NumericInput style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />
    );
  }
}

// ReactDOM.render(<NumericInputDemo />, mountNode);