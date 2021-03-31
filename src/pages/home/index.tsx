import React from 'react';
import { Button } from 'antd';

export default function Home(props: any) {
    return <div>
        home
        <Button type="primary">首页</Button>
        {
            props.children
        }
    </div>
}