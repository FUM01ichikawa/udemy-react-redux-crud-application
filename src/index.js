
//React使用に必須
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'

//createStore:storeを作成するための関数
//applyMiddleware:ミドルウェアを適用するための関数（reduxからインポート）
import {createStore, applyMiddleware } from 'redux'

//作成したstoreを全コンポーネントに渡すための機能を持つ特殊なコンポーネント
//react-reduxから提供されている
import {Provider} from 'react-redux'

//

import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';

//本番環境のみで必要
//import registerServiceWorker from './registerServiceWorker'

//引数にreducerを渡す
//アプリケーション内部で唯一のもの＆アプリケーション内部の全てのstateがstoreに集約される形になる
//applyMiddlewareに引数thunkを持たせ、createStateの第二引数に設定
const store = createStore(reducer, applyMiddleware(thunk))


//<Provider store={store}><App /</Provider>とすることで、
//どのコンポーネントからも参照出来るようになる（sotreを渡している）


ReactDOM.render(
  <Provider store={store}>
    <EventsIndex />
  </Provider>, document.getElementById('root')
);
//本番環境のみで必要
//registerServiceWorker();
