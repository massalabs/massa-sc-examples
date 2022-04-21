import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// window.addEventListener('click', function (e) {
//   if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
//     e.preventDefault();
//   }
// });
