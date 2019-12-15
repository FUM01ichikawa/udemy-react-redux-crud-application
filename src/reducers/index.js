import { combineReducers } from 'redux'
//redux-formから「reducer」をインポート。名称が普通すぎるので「form」とする
import { reducer as form } from 'redux-form' 
import events from './events'

//定義された全てのReducerをcombineReducersで統合
export default combineReducers({ events, form })
//複数設定は下記のような形
//export default combineReducers({ foo, bar, baz })