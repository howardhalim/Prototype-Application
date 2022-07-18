import axios from "axios";


const api = axios.create({
    baseURL: "https://iris-recognition-back-end.herokuapp.com/",
    timeout: 10000,
    params: {},
});

export default api;