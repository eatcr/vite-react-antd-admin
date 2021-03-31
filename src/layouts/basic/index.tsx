import React, {FC, useState} from 'react';
import {Layout} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import Logo from './components/Logo';
import MenuBasic from './components/MenuBasic';
import styles from './index.module.less';

const Layouts: FC = (props) => {

    const {Header, Footer, Sider, Content} = Layout;

    const [collapsed, setCollapsed] = useState(false);

    const siderWidth: number | string = 200; // 左侧 sider 宽度, 如果是数字, 则默认单位是 px

    return (
        <Layout className={styles["layout-basic"]}>
            <Sider trigger={null} collapsible collapsed={collapsed} className={styles["layout-basic-sider"]}
                   width={siderWidth}>
                <Logo/>
                <MenuBasic/>
            </Sider>
            <Layout className={styles["layout-basic-container"]}>
                <Header className={styles["layout-basic-header"]}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: styles.trigger,
                        onClick() {
                            setCollapsed(!collapsed);
                        },
                    })}
                </Header>
                <Content className={styles["layout-basic-content"]}>{props.children}</Content>
                <Footer className={styles["layout-basic-footer"]}>Footer</Footer>
            </Layout>
        </Layout>
    )
}

export default Layouts;