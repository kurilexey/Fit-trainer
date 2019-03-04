import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import SignComponent from "./Components/SignComponent";
import UsersWorkoutComponent from "./Components/UsersWorkoutComponent";
import './App.css';

class App extends Component {
    componentWillMount ( ) {
        if (this.props.history.location.pathname === "/")this.props.history.push("/sign in");
        if (this.props.history.location.pathname === "/user/:user")this.props.history.push("/user/:user/dashboard");
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exsact path = '/user/:user' component = {UsersWorkoutComponent} />
                    <Route path = '/' component = {SignComponent}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
