import axios from 'axios';
var resUrl = process.env.VUE_APP_REQUESTURL;
axios.defaults.timeout = 60000;

// 请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    }
);
// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code == 302) {
                if (response.data.data) {
                    var d = new Date();
                    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = "SESSION" + "=" + "" + "; " + expires;
                    var index = response.data.data.indexOf("=");
                    var path = response.data.data.substring(0, index + 1) + window.location.href;
                    window.open(path, "_self");
                }
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.message == 'timeout of 30000ms exceeded') {
            return { data: { code: 10, desc: '请求超时' } };
        } else {
            return { data: { code: 500, desc: '网络连接失败，请稍后重试' } };
        }
    }
);
export function request(method, url, callback, data) {
    var path = (url.indexOf("http") == -1) ? (resUrl + url) : (url);
    axios({
        method: method,
        url: path,
        data: data,
        headers: {
            Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjgxOWE5N2U3NjM0YjQ3NmNhNjJiZDhiYWZlYTBjMTQ5In0.0n4PfqfG_0Mm2HS_uyejt2tI9GPS77lEanohBf3J3liIwj4V5U5XB1sk3u_eWW9kBFWyxKyyy7L9G3hkvT7-YA',
        }
    }).then(res => {
        typeof callback == "function" && callback(res);
    }).catch(error => {
        console.log(error);
        typeof callback == "function" && callback({ code: 1 });
    });
}
