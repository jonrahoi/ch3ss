
//import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Table } from 'antd';

import React, { Component } from 'react'

interface IProps {
  history: [
    ''
  ]
  liveGame: any
}
interface IState {
  history: any
  liveGame: any
}
export default class what extends Component <IState, IProps>{
  render() {
    let {history} = this.props.history
    //let {liveGame} = this.state.liveGame
    const columns = [
      {
        title: 'Player',
        dataIndex: 'player',
        width: 10,
      },
      {
        title: 'From',
        dataIndex: 'from',
        width: 50,
      },
      {
        title: 'To',
        dataIndex: 'to',
        width: 50,
      },
      
    ];
    console.log("history in hitory: " + history);
    
    let num: number
    
    
    const data: any = [];
    // for (let i = 0; i < 100; i++) {
    //   data.push({
    //     key: i,
    //     player: '1',
    //     from: ` ${i}`,
        
    //     to: `${i+1}`,

    //   });
    // }
    
    //for (let i = 0; i < hist)
    return (
      <div className = "history" style = {{width: 300}}>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} scroll={{ y: 240 }} />
      </div>
    )
  }
}




          