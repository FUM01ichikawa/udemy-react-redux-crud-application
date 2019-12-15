import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//redux-form活用に必要なコンポーネントをインポート
import { Field, reduxForm } from 'redux-form'

//新しいイベントを送るメソッド
import { postEvent } from '../actions'

class EventsNew extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error} } = field
    return(
      <div>
        <input {...input} placeholder={label} type={type}/>
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  async onSubmit(values){
    await this.props.postEvent(values)
    this.props.history.push('/')
  }

  render(){  
    //disabledにpristineパラメータ→入力値がない場合ボタンを押せない形に設定
    //disabledにsubmittingパラメータ→一度押されたらボタンを押せない形に設定
    const { handleSubmit, pristine, submitting }= this.props
    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderField}/></div>
        <div><Field label="Body"  name="body"  type="text" component={this.renderField}/></div>

        <div>
          <input type="submit" value="Submit" disabled={ pristine || submitting} />
          <Link to="/" >Cancel</Link>
        </div>
      </form>
    )
  }
}

//バリデーション用関数
const validate = values => {
  const errors = {}

  if (!values.title)errors.title = "Enter a title, please."
  if (!values.body)errors.body = "Enter a body, please."
  
  return errors
}

const mapDispatchToProps = ({ postEvent })

//stateとactionをコンポーネントに関連付ける
export default connect(null, mapDispatchToProps)(
  //redux-formを使うためには、（import済みの）reduxForm関数の引数に「EventNew」を渡してあげれば良い。
  //フォームには、バリデーションやフォーム名を渡す必要がある
    reduxForm({ validate, form: 'eventNewForm' })( EventsNew )
)
