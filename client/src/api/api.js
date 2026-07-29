import axios from "axios";

const API = axios.create({
  baseURL: "https://video-confrencing-lt7b.onrender.com/api",
});

export default API;