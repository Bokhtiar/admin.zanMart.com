import axios from "axios";
import { getToken } from "../utils/helper";

//const apiUrl = "https://jobmedia-t8mk.onrender.com/api/v1";
const apiUrl = "https://jobmedia-api.azurewebsites.net/api/"
//const apiUrl = "https://jobmedia-sanbox.azurewebsites.net/api";

/* Publica/Common request config */
//axios.defaults.headers.post["Content-Type"] = "application/json";
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const publicRequest = axios.create({
    baseURL: apiUrl,
});

const privateRequest = axios.create({
    baseURL: apiUrl,
}); 

/* Public request config */
publicRequest.interceptors.request.use(
    async (config) => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        return config;
    },
    (err) => {
        console.log(err);
        Promise.reject(err);
    }
);

/* Private request config */
// privateRequest.interceptors.request.use(
//     async (config) => {
//         const token = getToken();
//         if (config.headers === undefined) {
//             config.headers = {};
//         }
//         if (token) {
           
//             config.headers["Authorization"] = "Bearer " + token || "";
//         }
//         return config;
//     },
//     (err) => {
//         console.log(err);
//         Promise.reject(err);
//     }
// );
privateRequest.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (config.headers === undefined) {
            config.headers = {};
        }
        if (token) {
            //config.headers["content-type"] = 'multipart/form-data';
            config.headers["Authorization"] = "Bearer " + token || "";
        }
        return config;
    },
    (err) => {
        console.log(err);
        Promise.reject(err);
    }
);

export { publicRequest, privateRequest };
