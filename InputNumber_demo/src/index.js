import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './demo';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App name='func component'/>, document.getElementById('root'));
window.ReactDOM = ReactDOM
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// a 删除
// b,c 更新
// d 创

