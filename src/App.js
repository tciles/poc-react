import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {PrivateRoute} from "./hoc/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LogoutPage from "./pages/LogoutPage";
import StagiairePage from "./pages/StagiairePage";

class App extends React.Component {

  render () {
    return (
        <Router>
          <PrivateRoute exact path="/" component={HomePage}/>
          <PrivateRoute path="/stagiaires/:id" component={StagiairePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/logout" component={LogoutPage}/>
          <Redirect from="*" to="/" />
        </Router>
    );
  }

}


export default App;
