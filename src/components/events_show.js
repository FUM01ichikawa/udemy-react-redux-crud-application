import React, { Component } from 'react';
import { connect } from 'react-redux'
//redux-form活用に必要なコンポーネントをインポート
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'


//新しいイベントを取得するメソッド
import { getEvent, deleteEvent, putEvent } from '../actions'

class EventsShow extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  //render後にgetEventというアクションでevent情報を取得する必要がある
  componentDidMount(){
    const { id } = this.props.match.params
    if(id) this.props.getEvent(id)
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

  async onDeleteClick(){
    const { id } = this.props.match.params
    console.log(id)
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  async onSubmit(values){
    await this.props.putEvent(values)
    this.props.history.push('/')
  }

  render(){  
    //disabledにpristineパラメータ→入力値がない場合ボタンを押せない形に設定
    //disabledにsubmittingパラメータ→一度押されたらボタンを押せない形に設定
    const { handleSubmit, pristine, submitting, invalid }= this.props
    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderField}/></div>
        <div><Field label="Body"  name="body"  type="text" component={this.renderField}/></div>

        <div>
          <input type="submit" value="Submit" disabled={ pristine || submitting || invalid} />
          <Link to="/" > Cancel </Link>
          <Link to="/" onClick={this.onDeleteClick}> Delete </Link>
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

const mapStateToProps = ( state, ownProps ) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

//stateとactionをコンポーネントに関連付ける
export default connect(mapStateToProps,  mapDispatchToProps)(
  //redux-formを使うためには、（import済みの）reduxForm関数の引数に「EventNew」を渡してあげれば良い。
  //フォームには、バリデーションやフォーム名を渡す必要がある
    reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })( EventsShow )
    //enableReinitialize: true （オプション）最初に渡したinitialValuesの値が変わる度にフォームを初期化する（何も記載がないとfalse設定）
)
