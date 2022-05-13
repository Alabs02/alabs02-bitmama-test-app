import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/store';
import reportWebVitals from 'src/reportWebVitals';
import { MaterialToastContainer } from 'src/components/core';

// APP
import App from 'src/app';

// APP STORE
// GLOBAL STYLES
import 'animate.css/animate.min.css';
import 'src/assets/scss/app.scss';
import 'src/styles/global.scss';
import 'material-react-toastify/dist/ReactToastify.css';

// APP ROOT
const root = document.getElementById('root') as HTMLElement;

render(
  <Provider store={store}>
    <PersistGate loading={<div />} persistor={persistor}>
      <StrictMode>
        <App />
        <MaterialToastContainer />
      </StrictMode>
    </PersistGate>
  </Provider>,
  root
);

// const isDev = process.env.NODE_ENV === 'development';
// if (isDev) reportWebVitals(console.log);
