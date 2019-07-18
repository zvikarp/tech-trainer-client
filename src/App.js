import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Auth, Chat, Chart, Settings, Admin } from './pages/index.js';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import store from './redux/store';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/auth/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./welcome";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: true
    }
  }

  changeAuthed(state) {
    this.setState({
      authed: state
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Chart} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/admin" component={Admin} />
          </div>
        </Router>
        <ToastsContainer store={ToastsStore}/>
      </Provider>
    );
  }
}

export default App;
