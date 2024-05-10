import axios from "axios";

const instance = axios.create({
    baseURL:'https://mern-to-do-application.onrender.com'
});

export default instance