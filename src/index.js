import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';

import store from './store/index';

import SelectInsurance from './pages/SelectInsurance';
import SelectProcedure from './pages/SelectProcedure';
import SelectLocation from './pages/SelectLocation';
import Result from './pages/Result';
import Search from './pages/Search';

import Header from './components/ui/Header';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<SelectInsurance/>} /> 
          <Route path="/procedure" exact element={<SelectProcedure/>} /> 
          <Route path="/location" exact element={<SelectLocation/>} />
          <Route path="/result" exact element={<Result/>} />
          <Route path="/search" exact element={<Search/>} />
        </Routes>
      </BrowserRouter>      
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
