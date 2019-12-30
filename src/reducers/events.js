/*不要
import { INCREMENT, DECREMENT } from  '../actions'

const initialState = { value: 0 }

//state =状態
export default ( state= initialState, action) =>{
  switch (action.type) {
    case INCREMENT:
      return {value: state.value +1}
    case DECREMENT:
      return {value: state.value -1}
    default:
      return state
  }
}
*/
import _ from 'lodash' //データを一括して変換するのに便利
import { 
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from  '../actions'

//stateは空でOK
export default ( events = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      console.log(action.response.data)
      //evnetsオブジェクトの中の該当のeventだけを表示→更新してeventsに戻したい
      const data = action.response.data
      return { ...events, [data.id]:data }

    case READ_EVENTS:
      return _.mapKeys(action.response.data,'id')
    case DELETE_EVENT:
      //DELETEイベントが発生したらeventsオブジェクトの中から該当idの情報を削除する
      delete events[action.id]
      //スプレッド演算子（...）を使うことで更新後のオブジェクトをreducerが返してくれる
      return { ...events }
    default:
      return events
  }

}