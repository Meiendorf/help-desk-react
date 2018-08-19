import _axios from 'axios';
import store from './store/config';
import * as actions from './store/actions';

const axios = _axios.create({
    baseURL: 'https://localhost:5001/api/'
});

const api = _axios.create({
    baseURL: 'https://localhost:5001/api/'
}); 

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
  
    const originalRequest = error.config;
  
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch(actions.refreshToken((token) => {
            console.log("[Axios interceptor] "+token);
            api(originalRequest);
        }));
        return 401;
    }else{
        return Promise.reject(error);
    }
});

export default api;
export {axios, api};