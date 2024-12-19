// Api.js
import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL, // Replace with your backend URL
  withCredentials: true, // Send cookies with requests
});

export default Api;
