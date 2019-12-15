import React, { Component } from 'react';
import { connect } from 'react-redux'

//イベント一覧を取得する関数のインポート
import { readEvents } from '../actions'

import _ from 'lodash' 

//クラスコンポーネント
class EventsIndex extends Component {
  
  //コンポーネントがマウントされた際に実行される
  componentDidMount(){
    //イベント一覧を取得する関数を動かす
    this.props.readEvents()
  }

  renderEvents(){
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  //＊＊知識＊＊
  //stateの初期化設定については、reduxではreducerで行うため下記は不要になる
  //constructor(props) { //初期化処理メソッド（クラスコンポーネントで使える）
  //  super(props)
  //  this.state = {count: 0 }
  
  render(){  
     return(
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
        
          <tbody>
            {this.renderEvents()}
          </tbody>
        </table>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })
const mapDispatchToProps = ({ readEvents })

//stateとactionをコンポーネントに関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
