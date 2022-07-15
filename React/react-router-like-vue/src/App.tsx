import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { RouterView } from './router';
import routes from '@/router/routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouterView routeList={routes} />
      </div>
    </BrowserRouter>
  );
}

export default App;
