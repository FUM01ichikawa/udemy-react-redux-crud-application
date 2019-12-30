
//React使用に必須
import React from 'react';
import ReactDOM from 'react-dom';

//createStore:storeを作成するための関数
//applyMiddleware:ミドルウェアを適用するための関数（reduxからインポート）
import {createStore, applyMiddleware } from 'redux'

//作成したstoreを全コンポーネントに渡すための機能を持つ特殊なコンポーネント
//react-reduxから提供されている
import {Provider} from 'react-redux'

import thunk from 'redux-thunk'

//必要なrouter関連コンポーネントをインポート
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//デバックをしやすくするためのツールを導入する
import { composeWithDevTools } from 'redux-devtools-extension'



//

import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';

//本番環境のみで必要
//import registerServiceWorker from './registerServiceWorker'


const enhancer = process.env.NODE_ENV === 'development' 
 ? composeWithDevTools( applyMiddleware(thunk) )
 : applyMiddleware(thunk)
//引数にreducerを渡す
//アプリケーション内部で唯一のもの＆アプリケーション内部の全てのstateがstoreに集約される形になる
//applyMiddlewareに引数thunkを持たせ、createStateの第二引数に設定→enhancerとして切り出し
const store = createStore(reducer, enhancer)


//<Provider store={store}><App /</Provider>とすることで、
//どのコンポーネントからも参照出来るようになる（sotreを渡している）


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/events/new" component={EventsNew}/>
        <Route path="/events/:id" component={EventsShow}/>
        <Route path="/" component={EventsIndex}/>
        <Route path="/events" component={EventsIndex}/>
        </Switch>
    </BrowserRouter>

  </Provider>, 
  document.getElementById('root')
);
//本番環境のみで必要
//registerServiceWorker();
