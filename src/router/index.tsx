import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Spin } from 'antd';

// const OtherComponent = React.lazy(() => import(/* webpackChunkName: 'OtherComponent' */ './OtherComponent'));
// // 它只能接收 export default 出来的 react 组件，这样就能将 otherComponent 这个组件分割出来了
// // webpackChunkName 这个的作用相当于是给分割出来的文件重新命名，不然打包出来的就会使 0.chunk.js 这样的 (只在 webpack 打包工具下有效)


/**
 * routesConfig 配置
 * path: 匹配的路由, 需全部路由
 * redirect: 重定向
 * component: 路由匹配的组件, 根据需要使用 lazy 按需引入
 * hidden: 不展示在 MenuBasic 菜单组件, 如果为 true 则不会渲染进 MenuBasic 菜单, 默认没有值或 false, 只作用在路由 '/' 和其子路由
 * meta: 元信息
 * meta.title 此值会展示在 MenuBasic 菜单组件和面包屑导航中, 只作用在路由 '/' 和其子路由
 * meta.icon 展示在 MenuBasic 菜单组件的 icon , 只作用在路由 '/' 和其子路由
 * meta.breadcrumbHidden: 不展示在面包屑导航中, 如果为 true 则不会渲染进面包屑导航中, 默认没有值或 false , 只作用在路由 '/' 和其子路由
 */

const routesConfig = [
    {
        path: "/login",
        component: React.lazy(() => import('../pages/login')),
    },
    // 为避免 '/login' 同时匹配到 '/' 和 '/login', 在 Switch 下面 '/' 路由放到数组最后面渲染
    {
        path: "/",
        redirect: '/home',
        component: React.lazy(() => import('../layouts/basic/index')),
        children: [
            {
                path: "/home",
                component: React.lazy(() => import('../pages/home')),
                meta: { title: '房子' },
            },
            {
                path: "/about",
                component: React.lazy(() => import('../pages/about')),
                meta: { title: '关于我' },
            }
        ]
    },
];

const routeRenderer = (route: any) => {
    return (
        <Route key={route.path} exact={!!route.exact} path={route.path}>
            <route.component>
                <Suspense fallback={<Spin />}>
                    <Switch>
                        {
                            route.children && route.children.map((item: any) => {
                                return routeRenderer(item);
                            })
                        }
                        {route.redirect && <Redirect exact from={route.path} to={route.redirect} />}
                    </Switch>
                </Suspense>
            </route.component>
        </Route>
    )
}

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Spin />}>
                <Switch>
                    {
                        routesConfig.map((route) => {
                            return routeRenderer(route);
                        })
                    }
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

/**
 * 根据 routesConfig 生成可供 MenuBasic 菜单组件渲染的数据
 */
export function getMenuData() {
    let routerData = routesConfig;
    let menuData: any = [];

    let menuRouter: any = routerData.find(item => {
        return item.path === '/';
    })

    menuData = menuRouter.children;

    return menuData;
}

export {
    routesConfig
};

export default RouterConfig;