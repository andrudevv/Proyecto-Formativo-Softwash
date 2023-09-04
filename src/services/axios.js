import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default Axios;
