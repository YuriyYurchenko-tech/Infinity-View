import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { injectStore } from './services/axiosInstance';
import './components/style.css';

injectStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>,
);
