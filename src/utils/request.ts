import axios from 'axios';
import { host } from '@/host';
import '@/utils/axiosSetting';

const request = async (_url: string, _options: any = {}) => {
    const url = host + _url;
    _options.method || (_options.method = 'POST');
    const options = {
        url,
        ..._options
    }

    return axios(options); // 返回的值需要判断 code 是否为 0 ，是则请求正常，否则是异常
}

export default request;
