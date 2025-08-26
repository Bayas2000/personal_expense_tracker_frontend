// import axios from "axios";

// const api = axios.create({
//     // baseURL: 'http://localhost:8070',
//     baseURL: 'https://expensetracker-backend-1-npwu.onrender.com/',
//     timeout: 25000,
//     headers: { Accept: 'application/json' },
//     withCredentials : true
// })

// export function setAuthToken(authtoken) {
//     api.defaults.headers.common['Authorization'] = authtoken

// }



// export default api

import axios from "axios";
import axiosRetry from "axios-retry";


const api = axios.create({
  baseURL: "https://expensetracker-backend-1-npwu.onrender.com/",
  // baseURL: 'http://localhost:8070',
  timeout: 25000,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

export function setAuthToken(authtoken) {
  api.defaults.headers.common["Authorization"] = authtoken;
}


axiosRetry(api, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return error.response?.status === 429 || error.response?.status >= 500;
    },
});

export default api;


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      delete api.defaults.headers.common["Authorization"];
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);