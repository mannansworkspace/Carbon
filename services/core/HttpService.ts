import axios from "axios";
import AppConfig from "AppConfig.json";
import { setError } from '@reducers/errorSlice'
import { ErrorMessage } from '@models/index'
import store from 'app/store'


// Global Axios Settings
axios.defaults.baseURL = AppConfig.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

const getErrorMessage = (error: string, errorMessage: string): string => {
  switch (error) {
    case 'NO_AUTH':
      return 'User must be logged in for this operation.'
    case 'BAD_CREDS':
      return 'bad credentials provided for authentication.'
    case 'USER_EXIST':
      return 'User with this email already exists.'
    default:
      return errorMessage + '.'
  }
}

axios.interceptors.response.use(value => {
  const { result, errorMessage, error, } = value.data;
  if (result === null && error) {
    if(error === 'NO_AUTH' && value.config.url?.includes('whoami')){
      return Promise.resolve(value)    
    }
    if(error === 'BAD_CAPTCHA' && (value.config.url?.includes('retire') || value.config.url?.includes('transfer'))) {
      return Promise.reject(value)
    }
    const err: ErrorMessage = { error: error + '! ', errorMessage: getErrorMessage(error, errorMessage),isError : true }
    store.dispatch(setError({...err, isAdmin:value.config.url?.includes('adm')}))
    return Promise.reject(value)
  }

  return Promise.resolve({...value, response: {data: value.data, status: value.status}})
}, error => {

    let errorMessage: ErrorMessage = null!;
    console.log("http error => ", error);

    if (!error.response) {
      const { baseURL, url } = error.config;

      errorMessage = { error: `Resource: ${baseURL + url}`, errorMessage: ' is not available.',isError : true}
      store.dispatch(setError(errorMessage))

      return Promise.reject(error);
    }

    const { data, status } = error.response;

    switch (status) {
      case 412:
        errorMessage = { error: data.result + '! ', errorMessage: data.details ,isError : true}
        break;
      case 500:
        errorMessage = { error: 'Internal error! ', errorMessage: 'Error occurred on the server',isError : true}
        break;
      case 401:
        errorMessage = { error: 'Authentication required! ', errorMessage: 'Failed to authenticate with the server',isError : true }
        break;
      case 400:
        errorMessage = { error: 'Bad Request! ', errorMessage: 'Sent an invalid request' ,isError : true}
        break;
      case 404:
        errorMessage = { error: 'Not Found! ', errorMessage: 'Requested resource does not exist' ,isError : true}
        break;
      case 408:
        errorMessage = { error: `Request Timeout! `, errorMessage: 'Server did not respond within a given time.',isError : true }
        break;
    }
    if (errorMessage) {
      // set error in redux state
      console.log(error.config)
      store.dispatch(setError(errorMessage))
    }

  return Promise.reject(error);
});

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default http;
