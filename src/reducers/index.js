import  { combineReducers } from 'redux'
import count from './count'

export default combineReducers({ count })
//複数設定は下記のような形
//export default combineReducers({ foo, bar, baz })