import React, { Component } from 'react';

//関数コンポーネント
const App = () => (<Counter></Counter>)

//クラスコンポーネント
class Counter extends Component {
  
  constructor(props) { //初期化処理メソッド（クラスコンポーネントで使える）
    super(props)
    this.state = {count: 0 }
  }


  handlePlusButton = () => {
      const currentCount = this.state.count
      this.setState({count: currentCount +1 })
  }

  handleMinusButton = () => {
    const currentCount = this.state.count
    this.setState({count: currentCount -1 })
}

  render(){
  return(
    <React.Fragment> 
      <div>counter:{ this.state.count }</div>)
      <button onClick={this.handlePlusButton}>+１</button>
      <button onClick={this.handleMinusButton}>-１</button>
    </React.Fragment>
  );
  }

}

export default App;
