import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
// 这里 less-vars-to-js 是将 less 样式转化为 json 键值对的形式，当然你也可以直接在 modifyVars 属性后写 json 键值对。
// @ts-ignore less-vars-to-js 没有类型声明文件
import lessToJS from 'less-vars-to-js';

const path = require('path');
const fs = require('fs');

const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './src/styles/theme.less'), 'utf8')
);

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: 'localhost',
        port: 6060, // 指定服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是服务器最终监听的实际端口。
    },
    plugins: [
        reactRefresh()
    ],
    css: {
        preprocessorOptions: {
            less: {
                // 支持 less 内联 JavaScript
                javascriptEnabled: true,
                // 重写 less 变量，定制样式
                modifyVars: themeVariables
            }
        }
    },
    resolve: {
        alias: {
            // 配置路径别名, (webstorm 会因为无法识别 vite 语法而冒红,  版本: 2020.03.02)
            '~': path.resolve(__dirname, './'), // 根路径
            '@': path.resolve(__dirname, 'src') // src 路径
        }
    }
})
