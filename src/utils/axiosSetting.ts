import axios from 'axios';
import { message } from 'antd';
// import { routerRedux } from 'dva/router';

axios.defaults.withCredentials = false; // 是否带上 cookie 请求，注意，设置了这个值为 true 后，后端的 Access-Control-Allow-Origin 的配置不能为通配符 "*"
axios.defaults.timeout = 60000;

// request token check
// axios 请求拦截器
axios.interceptors.request.use(config => {

    // 请求头处理, 根据后台需求来设置。以下是默认设置。
    // config.headers = {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json; charset=UTF-8',
    //     ...config.headers
    // }
    // if (config.method === 'GET') {
    //     config.headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json; charset=UTF-8',
    //         ...config.headers
    //     }
    // } else if (config.method === 'POST') {
    //     config.headers = {
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         ...config.headers
    //     }
    // }

    // token 处理, 如果存在 token 则请求带上 token
    // 注意：带上的 token 也可能是已经过期的 token，需要在返回的数据处理对应的状态
    const token = localStorage.getItem('taken');
    // token && (config.headers.Authorization = token);
    token && (config.headers.Authorization = token);

    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// axios 响应拦截器
axios.interceptors.response.use(response => {
    // 更新 token
    const token = response.headers.authorization;
    if (token) {
        localStorage.setItem('token', token);
    }

    let info = response.data; // 这里的返回数据会嵌套上一层 axios 的格式，所以返回 response.data 即是后台返回的数据
    // 正常请求的错误处理（如果服务器把错误由自定义 http 状态返回，则此处的正常请求错误处理可写在下方 error 中
    if (info.code !== 0) { // 如果返回的 code 不是 0 ，说明接口连接成功，但后台手动返回某个错误
        // 添加 | 修改 | 删除 失败
        if (info.code === -1) {
            message.error(info.msg);
        }
        // return Promise.reject(info);
        return info; // 没有返回 promise error 是因为接收函数没有处理
    }

    return info;

}, error => {
    interface CodeMessage {
        [propName: number]: any;
    }
    const codeMessage: CodeMessage = {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
    };

    const { response } = error;
    console.log('error', error)
    console.log('response', response)
    console.log('JSON.str', JSON.stringify(error));
    console.log('error.code', error.code)
    console.log('request', error.request);

    // 处理超时
    if (!response) {
        message.error('未成功请求服务器，请重试'); // 没有正确发送请求，可能是超时或请求代码 BUG
        return error;
    }

    // 处理错误状态
    const {
        status,
        statusText,
        data: {  // data 里面的数据字段名需要和后台协商一致
            msg = '服务器发生未知错误'
        }
    } = response;

    message.error(`${status}:${codeMessage[status] || statusText || msg}`);

    return error; // 没有返回 promise error 是因为接收函数没有处理
});
