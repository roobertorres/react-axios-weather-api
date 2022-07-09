import axios from "axios";

const api = axios.create({
    baseURL: "https://api.hgbrasil.com/weather?format=json-cors&key=e167cd53",
});

export default api;