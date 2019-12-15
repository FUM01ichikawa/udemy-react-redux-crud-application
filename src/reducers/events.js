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
import { READ_EVENTS } from  '../actions'

//stateは空でOK
export default ( events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      return _.mapKeys(action.response.data,'id')
    default:
      return events
  }

}