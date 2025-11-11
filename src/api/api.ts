import axios, { AxiosInstance } from "axios";

export let BASE_URL: string = "";

const IS_PROD: boolean = false;

if (IS_PROD) {
  BASE_URL = "/api/";
} else {
  BASE_URL = "http://localhost:5001/api/";
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
