import axios, { AxiosRequestConfig } from 'axios';
// import Cookie from 'js-cookie'
import qs from 'qs';
import { showToast } from 'vant'

// 创建实例
const instance = axios.create({ timeout: 10000 });

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
instance.interceptors.request.use(config => {
    // const token = Cookie.get("token");
    // if (token) {
    //     config.headers = config.headers || {}
    //     config.headers.Authorization = token
    // }
    return config;
}, err => {
    return Promise.reject(err);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
    if (response?.status === 200) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}, error => {
    if (error?.response?.status) {
        let msg = error.response.data?.message;
        switch (error.response.status) {
            case 401:
                showToast(msg || '尚未登录系统，请先登录');
                // history.replace({ pathname: '/login' });
                break;
            case 403:
                showToast(msg || '登录信息已过期，请重新登录');
                localStorage.removeItem('userToken');
                // history.replace({ pathname: '/login' });
                break;
            case 404:
                showToast(msg || '网路请求不存在');
                break;
            default:
                showToast(msg || '网络错误，请联系IT人员');
                break;
        }
    }
});

/**
 * get方法，对应get请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 */
export function get(url: string, params: {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params,
        }).then(res => {
            resolve(res.data);
        }).catch(err => { reject(err.data) });
    })
};

/**
 * post方法，对应post请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 */
export function post(url: string, params: {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, qs.stringify(params))
            .then(res => { resolve(res.data) })
            .catch(err => { reject(err.data) });
    })
}

/**
 * postFile方法，对应post请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 */
export function postFile(url: string, fileList: any[]) {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        fileList.forEach((it) => formData.append('file', it.file))
        instance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => { resolve(res.data) })
            .catch(err => { reject(err.data) });
    })
}