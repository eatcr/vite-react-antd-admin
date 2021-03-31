import React, { FC, useEffect } from 'react';
import { Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { useLocation, Link } from 'react-router-dom'
import { getMenuData } from '../../../router';


const MenuBasic = (props: any) => {

    const menuData = getMenuData();

    function menuItemRenderer(menuItem: any) {
        if (!menuItem.hidden && menuItem.meta && menuItem.meta.title) {
            if (menuItem.children && menuItem.children.length) {
                return (
                    <Menu.SubMenu key={menuItem.path} title={menuItem.meta.title} icon={<UserOutlined />}>
                        {
                            menuItem.children.map((subMenuItem: any) => {
                                return menuItemRenderer(subMenuItem);
                            })
                        }
                    </Menu.SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={menuItem.path} icon={<UserOutlined />}>
                        <Link to={menuItem.path}>{menuItem.meta.title}</Link>
                    </Menu.Item>
                )
            }
        }
    }

    return (
        /**
         * Menu 组件在 React.StrictMode 严格模式下如果有二级菜单会出现 findDOMNode 红色错误警告
         * 删除严格模式代码即可隐藏冒红, 但并不建议这么做
         */
        <Menu theme="dark" mode="inline" selectedKeys={[useLocation().pathname]}>
            {
                menuData.map((menuItem: any) => {
                    return menuItemRenderer(menuItem);
                })
            }
        </Menu>
    )
}

export default MenuBasic;