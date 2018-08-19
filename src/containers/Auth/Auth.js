import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import './Auth.css';
import * as actions from '../../store/actions/';
import FormWrapper from '../../components/Auth/FormWrapper';
import ResetForm from '../../components/Auth/ResetForm';
import AuthForm from '../../components/Auth/AuthForm';

const emailRegExp = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$');

class Auth extends Component{
    state = {
        auth : {
            passHelperText : null,
            emailHelperText : null,
            password : "",
            email : "",
            remember : true
        },
        reset : {
            passHelperText : null,
            confPassHelperText : null,
            password : "",
            confirmPassword : "",
            code : ""
        }
    }

    resetPassChangedHandler = (event) => {
        let reset = {...this.state.reset};
        reset.password = event.target.value;
        if(reset.password.length < 6){
            reset.passHelperText = "Пароль должен занимать минимум 6 символов";
        }else{
            reset.passHelperText = null;
        }
        if(reset.password == reset.confirmPassword){
            reset.confPassHelperText = null;
        }else{
            reset.confPassHelperText = "Пароли не совпадают";
        }
        this.setState({reset : reset});
    }

    resetConfPassChangedHandler = (event) => {
        let reset = {...this.state.reset};
        reset.confirmPassword = event.target.value;
        if(reset.confirmPassword != reset.password){
            reset.confPassHelperText = "Пароли не совпадают";
        }else{
            reset.confPassHelperText = null;
        }
        this.setState({reset : reset});
    }

    resetCodeChangedHandler = (event) => {
        let reset = {...this.state.reset};
        reset.code = event.target.value;
        this.setState({reset : reset});
    }

    resetSubmited = (event) => {
        event.preventDefault();
        if(this.state.reset.confPassHelperText != null || this.state.reset.passHelperText != null){
            return;
        }
        this.props.resetPassword(this.state.auth.email, this.state.reset.code, this.state.reset.password);
    }

    rememberChangedHandler = (event) => {
        let auth = {...this.state.auth};
        auth.remember = event.target.checked;
        this.setState({auth : auth});
    }

    authSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.auth.passHelperText != null){
            return;
        }
        this.props.onAuth(this.state.auth.email, this.state.auth.password, this.state.auth.remember);
    }

    authPassChanged = (event) => {
        let value = event.target.value;
        var authObj = {...this.state.auth};
        authObj.password = value;
        if(value == null || value == "" || value.length > 5){
            authObj.passHelperText = null;
            
        }else{
            authObj.passHelperText = "Пароль должен содержать минимум 6 символов";
        }
        this.setState({auth : authObj});
    }

    authEmailChanged = (event) => {
        var authObj = {...this.state.auth};
        authObj.email = event.target.value;
        authObj.emailHelperText = null;
        this.setState({auth : authObj});
    }
    
    resetPasswordClick = () => {
        var authObj = {...this.state.auth};
        if(authObj.email == "" || authObj.email == null){
            authObj.emailHelperText = "Введите email для получения кода";
        }
        else if(!emailRegExp.test(authObj.email)){
            authObj.emailHelperText = "Некорректный формат email адреса";
        }
        else{
            authObj.emailHelperText = null;
            this.props.resetingStart(authObj.email);
        }
        this.setState({auth : authObj});
    }

    componentDidMount (){
        
    }

    render(){
        let activeForm = this.props.reseting ? 
            <ResetForm
                onSubmit={this.resetSubmited}
                code={this.state.reset.code}
                codeChanged={this.resetCodeChangedHandler}
                passHelperText={this.state.reset.passHelperText}
                passChanged={this.resetPassChangedHandler}
                password={this.state.reset.password}
                confPassHelperText={this.state.reset.confPassHelperText}
                confirmPasswordChanged={this.resetConfPassChangedHandler}
                confirmPassword={this.state.reset.confirmPassword}
                toggleClick={this.props.resetingEnd}/> :
            <AuthForm
                onSubmit={this.authSubmitHandler}
                passChanged={this.authPassChanged}
                emailChanged={this.authEmailChanged}
                email={this.state.auth.email}
                emailHelperText={this.state.auth.emailHelperText}
                password={this.state.auth.password}
                passHelperText={this.state.auth.passHelperText}
                remember={this.state.auth.remember}
                rememberChanged={this.rememberChangedHandler}
                toggleClick={this.resetPasswordClick}/>;
        
        let content;
        if(this.props.authRestoring){
            content = (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            );
        }else{
            content = (
                <FormWrapper
                    error={this.props.authError}
                    loading={this.props.authLoading}
                    reseting={this.props.reseting}>
                    {activeForm}
                </FormWrapper>
            );
        }
            
        return(
            <div className="au-main">
                {this.props.isAuthenticated ? (
                    <Redirect to="/"/>
                ) : null}
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authLoading : state.auth.loading,
        authRestoring : state.auth.globalLoading,
        authError : state.auth.error,
        isAuthenticated : state.auth.token != null,
        reseting : state.auth.reseting
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, remember = true) => dispatch(actions.auth(email, password, remember)),
        resetingStart : email => dispatch(actions.resetStart(email)),
        resetPassword : (email, code, password) => dispatch(actions.resetPassword(email, code, password)),
        resetingEnd : () => dispatch(actions.authResetEnd())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);