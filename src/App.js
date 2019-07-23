import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import JwtDecode from "jwt-decode";

import { Auth, Chart, Settings, Admin, Profile } from './pages/index.js';
import { SetCurrentUser, LogoutUser } from "./redux/actions/authActions";
import SetAuthToken from "./utils/auth/setAuthToken";
import store from './redux/store';


// handels user token on page reload 
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  SetAuthToken(token);
  const decoded = JwtDecode(token);
  store.dispatch(SetCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(LogoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Chart} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </Router>
        <ToastsContainer store={ToastsStore}/>
      </Provider>
    );
  }
}

export default App;