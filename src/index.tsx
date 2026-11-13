import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const publicPath = new URL(process.env.PUBLIC_URL, window.location.origin).pathname.replace(/\/+$/, '');
const redirect = window.location.search.slice(1);
if (redirect.startsWith('/')) {
  const [redirectPath, ...queryParts] = redirect.split('&');
  const restoredPath = `${publicPath}${redirectPath.replace(/~and~/g, '&')}`;
  const restoredQuery = queryParts.length > 0
    ? `?${queryParts.join('&').replace(/~and~/g, '&')}`
    : '';
  window.history.replaceState(
    null,
    '',
    `${restoredPath || '/'}${restoredQuery}${window.location.hash}`,
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
