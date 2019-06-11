import React, { Fragment } from 'react';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
//Router
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <header className='App-header'>
            <p>I just do API for this App.</p>
          </header>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
