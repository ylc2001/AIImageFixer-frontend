import axios from 'axios'
import qs from 'qs'
import { backend_url } from "@/main"
import CookieOperation from "@/utils/tools";

export function request_json(url, method, data) {
    axios.defaults.baseURL = backend_url;
    if (method == "get") {
        return axios.get(url, {
            params: data,
        }).then((response) => {
            console.log(response)
            return response.data
        }).catch((error) => {
            console.log(error.response.data.data);
            if (error.response.data.code == 405) {
                CookieOperation.setCookie("need_relogin", 1, 10e9);
                window.location.href = "/";
            }
            return {
                code: error.response.data.code,
                data: error.response.data.data,
            }
        });
    } else if (method == "post") {
        console.log(data)
        return axios.post(url, qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((response) => {
            console.log(response)
            return response.data
        }).catch((error) => {
            console.log(error);
            console.log(error.response.data.data)
            if (error.response.data.code == 405) {
                CookieOperation.setCookie("need_relogin", 1, 10e9);
                window.location.href = "/";
            }
            return {
                code: error.response.data.code,
                data: error.response.data.data,
            }
        });
    }
    else {
        console.log("Wrong Request")
    }
}