import React, { FC } from 'react';
import { Button } from 'antd';
import './index.css';

const Layouts: FC = (props) => {
    return (
        <>
            <div>登录布局</div>
            {props.children}
            <Button type="primary">Button</Button>
        </>
    )
}

export default Layouts;