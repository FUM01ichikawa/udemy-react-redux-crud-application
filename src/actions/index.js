
/*不要
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const increment = () => ({
  type: INCREMENT
 })

 export const decrement = () => ({
  type: DECREMENT
 })
*/

//外部のAPIサーバにリクエストを投げる処理に必要なHTTPクライアント
import axios from 'axios'

//イベント一覧を取得する関数の設定
 export const READ_EVENTS = 'READ_EVENTS'
 export const CREATE_EVENT = 'CREATE_EVENT'

//ルートとなるURL
const ROOT_URL    = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

 //外部のAPIサーバにリクエストを投げる処理
 //readEventsは単純に「オブジェクト」しかエクスポートできない
 //→このままでは”非同期処理を行う”という動作を組み込めない
 //redux-thunkを使うことで、アクションの代わりに"関数を返す"ことが可能になるのでこれを活用
 //redux-thunkで渡せるようになった「dispach」メソッドをパラメータとして渡す
 //※"getState"も関数ものパラメータに渡せる

 export const readEvents = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)  
  //async + await 非同期処理の戻り値を扱う
  //axios.get~：HTTPリクエストを送る 部分で非同期通信で
  dispatch({ type: READ_EVENTS ,response})
 }


 export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)  
  dispatch({ type: CREATE_EVENT, response})
 }