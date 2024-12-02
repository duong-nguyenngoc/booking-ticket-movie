import axios from "axios";
import { adminLocalStorage } from "./localService";
import { store } from "../redux/configstore";
import {
  SET_LOADING_OFF,
  SET_LOADING_ON,
} from "../redux/constant/spinnerConstant";

export const TOKEN_CYBER = import.meta.env.VITE_TOKEN_CYBERSOFT;

export const configHeaders = () => {
  return {
    TokenCybersoft: TOKEN_CYBER,
  };
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_URL_2 = "https://movienew.cybersoft.edu.vn/api";
export const GROUP_ID = "GP01";

const accessToken = adminLocalStorage.get()?.accessToken;

export const htttps = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    TokenCybersoft: TOKEN_CYBER,
  },
});

export const httpsNoLoading = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    TokenCybersoft: TOKEN_CYBER,
  },
});

htttps.interceptors.request.use(
  function (config) {
    store.dispatch({
      type: SET_LOADING_ON,
    });
    return config;
  },
  function (error) {
    store.dispatch({ type: SET_LOADING_OFF });
    return Promise.reject(error);
  }
);
https.interceptors.respone.use(
  function (respone) {
    store.dispatch({ type: SET_LOADING_OFF });
    return respone;
  },
  function (error) {
    store.dispatch({ type: SET_LOADING_OFF });
    return Promise.reject(error);
  }
);
