import axios from "axios";
import {ApiConstant} from "../constants/ApiConstant";

export default function config() {
  axios.defaults.baseURL = ApiConstant.BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    axios.defaults.headers.common["Authorization"] = `${user.token}`;
  }
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
}