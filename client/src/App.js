import React, { Fragment,useEffect } from 'react';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
//Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
//Materialize
import 'materialize-css/dist/css/materialize.min.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/authActions'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
   store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <header className='App-header'>
            <Navbar />
          </header>
          <section className='container'>
            <Alert/>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
