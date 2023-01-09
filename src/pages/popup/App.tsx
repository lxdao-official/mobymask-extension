import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';

// import './scripts/tag';

const rootElement = document.createElement('div');
rootElement.id = 'mobymask-root';

document.body.appendChild(rootElement);

function Root() {
  return <div></div>;
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Toaster />
  </React.StrictMode>,
  rootElement,
);
