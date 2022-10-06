import axios from "axios";

async function AxiosMiddleware(method, url, data, options) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
  switch (method) {
    case "get":
      return axios.get(url, options, data);
    case "post":
      return axios.post(url, data, options);
    case "head":
      return axios.head(url, data, options);
    case "patch":
      return axios.patch(url, data, options);
    case "put":
      return axios.put(url, data, options);
    case "delete":
      return axios.delete(url, { data: data, headers: options });
  }
}

export default {
  get: (url, data = [], options = {}) => {
    return AxiosMiddleware("get", url, options, data);
  },
  post: (url, data = [], options = {}) => {
    return AxiosMiddleware("post", url, data, options);
  },
  head: (url, data = [], options = {}) => {
    return AxiosMiddleware("head", url, data, options);
  },
  patch: (url, data = [], options = {}) => {
    return AxiosMiddleware("patch", url, data, options);
  },
  put: (url, data = [], options = {}) => {
    return AxiosMiddleware("put", url, data, options);
  },
  delete: (url, data = [], options = {}) => {
    return AxiosMiddleware("delete", url, data, options);
  },
};
