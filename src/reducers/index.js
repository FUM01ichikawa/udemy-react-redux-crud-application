import  { combineReducers } from 'redux'
import events from './events'

export default combineReducers({ events })
//複数設定は下記のような形
//export default combineReducers({ foo, bar, baz })