import axios from 'axios';
import { get } from 'lodash';

const serverUrl = process.env.REACT_APP_SHOPEE_SERVICE_URL;
const instance = axios.create({
  baseURL: serverUrl,
});

export const axiosInterceptor = () => {
  instance.interceptors.request.use(
    async function(config) {
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    errorResponse => {
      return Promise.reject(get(errorResponse, 'response.data') || { message: 'Something went wrong!' });
    }
  );
};

const axiosService = {
  get: (endPoint, data, headers = {}) => {
    const config = {};
    if (!endPoint) {
      throw Error('endPoint is required params');
    } else {
      if (data) {
        config.params = data;
      }
      config.headers = headers;
      return instance.get(endPoint, config);
    }
  },
  post: (endPoint, data, headers = {}) => {
    if (!(endPoint || !data)) {
      throw Error('endPoint and data are required params');
    }
    return instance.post(endPoint, data, { headers });
  },
  put: (endPoint, data, headers = {}) => {
    if (!(endPoint || !data)) {
      throw Error('endPoint and data are required params');
    }
    return instance.put(endPoint, data, { headers });
  },
  delete: (endPoint, data, headers = {}) => {
    const config = {};
    if (!endPoint) {
      throw Error('endPoint is required params');
    } else {
      if (data) {
        config.params = data;
      }
      config.headers = headers;
      return instance.delete(endPoint, config);
    }
  },
};

export default axiosService;
