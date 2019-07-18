
//import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Table } from 'antd';

import React, { Component } from 'react'

interface IProps {
  history: any
}
interface IState {
  history: any
}
export default class what extends Component <IState, IProps>{
  render() {
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
    
    
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        player: '1',
        from: ` ${i}`,
        
        to: `${i+1}`,
      });
    }
    return (
      <div style = {{width: 300}}>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} scroll={{ y: 240 }} />
      </div>
    )
  }
}




          