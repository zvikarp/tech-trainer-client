// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import React from 'react'
import { Welcome, Dashboard } from './pages/index.js'
// import { Button } from './components/index.js'
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { GlobalStyle } from './utils/styles/global';
// const App = () => (
//   // <Provider store={store}> 
//           <Router>
//               <Switch>
//                   <Route path="/" component={Button} />
//                   {/* <Route exact path="/" component={OtherComponent} /> */}
//               </Switch>
//           </Router>
//   // </Provider>
// );

function App() {
  return (
    <div className="App">
      <div>
      <Welcome />
      {/* <Welcome/> */}
      </div>
    </div>
  );
}

export default App;
