import 'antd/dist/antd.css';
import '../index.css';
import { Table } from 'antd';

import React, { Component } from 'react'

interface IProps {
  
}

/**
 * Get history from app.tsx
 */
interface IState {
  history: any
}
export default class what extends Component <IState, IProps>{
  render() {
    let {history} = this.props
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
    
    const data: any = []
    
    for (let i = 0; i < history.length; i = i+2) {
      if(i % 4 == 0) {
        data.push({
          key: i,
          player: 'White',
          from: history[i],
          to: history[i + 1]
        })
      }
      else {
        data.push({
          key: i,
          player: 'Black',
          from: history[i],
          to: history[i + 1]
        })
      }
    }
    
    return (
      <div className = "history" style = {{width: 300}}>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} scroll={{ y: 240 }} />
      </div>
    )
  }
}




          