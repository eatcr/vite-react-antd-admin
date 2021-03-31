import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from "./router";
/**
 * 引入 ant design 样式文件
 * 自带清除浏览器默认样式
 * 这里全局引入是因为配置的按需引入可能会造成某些组件样式缺失
 * 例如: 如果是按需引入样式, 可能会造成在菜单缩小的时候鼠标移入 tips 样式缺失
 */
import 'antd/dist/antd.less';
import './styles/index.less'; // 引入全局样式文件

ReactDOM.render(
    <React.StrictMode>
        <RouterConfig />
    </React.StrictMode>,
    document.getElementById('root')
)
