import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './Layout/Layout';
import Dashboard from '../components/Dashboard/Dashboard';
import Auth from './Auth/Auth';
import * as actions from '../store/actions';
import './App.css';

class App extends Component {
    componentDidMount(){
        this.props.restoreAuthState();
    }
    render() {
        let routes;
        if(this.props.token == null){
            routes = (
                <Switch>
                    <Route path="/login" exact component={Auth}/>
                    <Redirect to="/login"/>
                </Switch>
            );
        }else{
            routes = (
                <Switch>
                    <Route path="/login" exact component={Auth}/>
                    <Route path="/" exact component={Dashboard}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }
        return (
        <div className="App">
            {routes}
        </div>);
    }
}

const mapStateToProps = state => {
    return{
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        restoreAuthState : () => dispatch(actions.restoreFromStorage())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
