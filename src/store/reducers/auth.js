import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    role: null,
    username : null,
    fullName : null,
    error: null,
    loading: false,
    globalLoading : false,
    reseting : false
};

const authStart = ( state, action ) => {
    return {
        ...state,
        error : null,
        loading : true
    }
};

const authRestoreStart = (state, action) => {
    return{
        ...state,
        globalLoading : true
    }
}
const authSuccess = (state, action) => {
    return {
        ...state, 
        token: action.token,
        error: null,
        loading: false,
        globalLoading : false
     }
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
        globalLoading : false
    }
};

const authLogout = (state, action) => {
    return {
        ...state,
        token : null,
        role : null,
        loading : false,
        globalLoading : false
    }
};

const refreshUserInfo = (state, action) => {
    return{
        ...state,
        role : action.payload.role,
        username : action.payload.username,
        fullName : action.payload.fullName
    }
}

const authResetStart = (state, action) => {
    return{
        ...state,
        reseting : false,
        error : null,
        loading : true
    }
}

const authResetStartSuccess = (state, action) => {
    return{
        ...state,
        loading : false,
        reseting : true,
        error : null
    }
}
const authResetEnd = (state, action) => {
    return{
        ...state,
        reseting : false,
        error : null,
        loading : false
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_GET_INFO: return refreshUserInfo(state, action);
        case actionTypes.AUTH_RESTORE: return authRestoreStart(state, action);
        case actionTypes.AUTH_RESET_START: return authResetStart(state, action);
        case actionTypes.AUTH_RESET_PASSWORD: return authStart(state, action);
        case actionTypes.AUTH_RESET_FAIL: return authFail(state, action);
        case actionTypes.AUTH_RESET_END: return authResetEnd(state, action);
        case actionTypes.AUTH_RESET_START_SUCCESS: return authResetStartSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;