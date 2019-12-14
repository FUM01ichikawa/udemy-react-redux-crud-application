import React, { Component } from 'react';
import { connect } from 'react-redux'

import { increment, decrement } from '../actions'

//クラスコンポーネント
class App extends Component {

  //stateの初期化設定については、reduxではreducerで行うため下記は不要になる
  //constructor(props) { //初期化処理メソッド（クラスコンポーネントで使える）
  //  super(props)
  //  this.state = {count: 0 }
  
  render(){
    const props = this.props
    return(
      <React.Fragment> 
        <div>value:{ props.value }</div>
        <button onClick={props.increment}>+１</button>
        <button onClick={props.decrement}>-１</button>
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => ({ value: state.count.value })
const mapDispatchToProps = dispatch => ({
  increment: ()=> dispatch(increment()),
  decrement: ()=> dispatch(decrement())
})

//省略した書き方だと、
//const mapDsipatchToProps = ({increment, decrement})

//stateとactionをコンポーネントに関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(App)
