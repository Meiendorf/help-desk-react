import {axios, api} from '../../axiosConfig';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    console.log(token);
    return{
        type : actionTypes.AUTH_SUCCESS,
        token : token
    }
}

export const authFail = (error) => {
    let msg = "Server error";
    if(error.message == "Network Error"){
        msg = "Невозможно подключиться к серверу";
    }
    if(error.response != null){
        if(error.response.status == 400){
            msg = "Неправильный логин или пароль"
        }
    }
    return{
        type : actionTypes.AUTH_FAIL,
        error : msg
    }
}

export const authLogout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("logoutAt");
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const refreshUserInfo = (payload) => {
    return {
        type : actionTypes.AUTH_GET_INFO,
        payload : payload
    }
}

export const authRestore = () => {
    return {
        type : actionTypes.AUTH_RESTORE
    }
}

export const authResetStart = () => {
    return{
        type : actionTypes.AUTH_RESET_START
    }
}

export const authResetPassword = () => {
    return{
        type : actionTypes.AUTH_RESET_PASSWORD
    }
}

export const authResetStartSuccess = () => {
    return{
        type : actionTypes.AUTH_RESET_START_SUCCESS
    }
}

export const authResetFail = error => {
    let msg = "Server error";
    if(error.message == "Network Error"){
        msg = "Невозможно подключиться к серверу";
    }
    if(error.response != null){
        if(error.response.status == 400){
            msg = "Неправильный код, вернитесь назад и нажмите \"Cбросить пароль\" для повторной отправки";
        }
        if(error.response.status == 404){
            msg = "Введеный email не был зарегистрирован";
        }
    }
    return{
        type : actionTypes.AUTH_RESET_FAIL,
        error : msg
    }
}

export const authResetEnd = () => {
    return {
        type : actionTypes.AUTH_RESET_END
    }
}

export const resetStart = email => {
    return dispatch => {
        dispatch(authResetStart());
        axios.post("account/reset/send", {email : email})
            .then(response => {
                console.log("RESET START ", response);
                dispatch(authResetStartSuccess());
            })
            .catch(err => {
                console.log("RESET START ", err);
                dispatch(authResetFail(err));
            })
    }
}

export const resetPassword = (email, code, password) => {
    return dispatch => {
        dispatch(authResetPassword());
        const data = {
            email : email,
            code : code,
            password : password
        }
        axios.post("account/reset", data)
            .then(response => {
                console.log("RESET PASSWORD ", response);
                dispatch(authResetEnd());
            })
            .catch(err => {
                console.log("RESET PASSWORD ", err.response, err.message);
                dispatch(authResetFail(err));
            })
    }
}

export const logout = () =>{
    return dispatch => {
        let refreshToken = localStorage.getItem("refreshToken");
        dispatch(authLogout());
        if(refreshToken != null){
            axios.post("account/logout", {refreshToken : refreshToken})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
const handleTokenResponse = (response, dispatch) => {
    console.log(response);
    const expirationDate = new Date(new Date().getTime() + response.data.expire * 60 * 1000);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    dispatch(authSuccess(response.data.accessToken));
    dispatch(checkAuthTimeout(response.data.expire * 60));
    dispatch(getUserInfo(response.data.accessToken));
}

export const refreshToken = (onSuccess) => {
    return dispatch => {
        let token = localStorage.getItem("refreshToken");
        if(token == null){
            dispatch(logout());
            return;
        }
        axios.post("account/refresh", {refreshToken : token})
            .then(response => {
                handleTokenResponse(response, dispatch);
                if(onSuccess != null) {
                    onSuccess(response.data.accessToken);
                }
            })
            .catch(err => {
                alert("[REFRESHING] "+err.message);
                dispatch(logout());
            })
    }
}

export const getUserInfo = (token) => {
    return dispatch => {
        if(token == null){
            return;
        }
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        api.get("account/info")
            .then(response => {
                //Check axiosConfig.js if confused
                if(response != 401){
                    dispatch(refreshUserInfo({
                        role : response.data.role,
                        username : response.data.username,
                        fullName : response.data.fullName
                    }));
                }
            })
            .catch(err => {
                alert("[GET USER INFO] "+err.message);
                dispatch(logout());
            })
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(refreshToken());
        }, expirationTime * 1000);
    }
}

export const restoreFromStorage = () => {
    return dispatch => {
        dispatch(authRestore());
        let logoutAt = localStorage.getItem("logoutAt");
        if(logoutAt != null){
            logoutAt = new Date(logoutAt);
            if(logoutAt.getTime() <= new Date().getTime()){
                dispatch(logout());
                return;
            }
        }
        let token = localStorage.getItem("token");
        let expire = localStorage.getItem("expirationDate");
        if(token == null || expire == null){
            dispatch(refreshToken());
        }else{
            let expirationDate = new Date(expire);
            if(expirationDate <= new Date()){
                dispatch(refreshToken());
            }else{
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                dispatch(authSuccess(token));
                dispatch(getUserInfo(token));
            }
        }
    }
}

export const auth = (email, password, remember = true) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            username : email,
            password : password
        }
        axios.post("account/token", data)
            .then(response => {
                if(!remember){
                    localStorage.setItem("logoutAt", new Date(new Date().getTime()+(24 * 60 * 60 * 1000)));
                }
                handleTokenResponse(response, dispatch);
            })
            .catch(err => {
                console.log(err.message);
                dispatch(authFail(err));
            })
    }
}