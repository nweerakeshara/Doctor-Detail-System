import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import disableBrowserBackButton from 'disable-browser-back-navigation';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/empActions";

import LoginEmp from "./components/login.component";
import NavbarComponent from "./components/navbar.component";
import DocList from "./components/docList.component";
import SearchDocListComponent from "./components/searchDocList.component";
import RegisterEmp from "./components/register.component";
import AddDoc from "./components/addDoc.component";




class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
    disableBrowserBackButton();
  }

  render() {
    return (
        <div>

          <Router>
            <Provider store={store}>

                <NavbarComponent/>
                <div className="container">

                  <br/>

                  <Switch>
                    <Route exact path='/' component={DocList}/>
                    <Route exact path='/loginEmp' component={LoginEmp}/>
                    <Route exact path='/search' component={SearchDocListComponent}/>
                    <Route exact path='/registerEmp' component={RegisterEmp}/>
                    <Route exact path='/addDoc' component={AddDoc}/>




                  </Switch>
                </div>

            </Provider>
          </Router>


        </div>

    );
  }
}

export default App;
