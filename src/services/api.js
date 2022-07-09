import axios from "axios";

const api = axios.create({
    baseURL: "https://api.hgbrasil.com/weather?format=json-cors&key=c9816580",
});

export default api;
