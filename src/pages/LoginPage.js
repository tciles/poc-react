import React, {useState} from "react"
import {Button, Checkbox, Form, Input} from "antd";
import "./LoginPage.css"
import userService from "../services/userService";
import {withRouter} from "react-router-dom"

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 0},
};
const tailLayout = {
    wrapperCol: {offset: 0, span: 0},
};

const LoginPage = ({history}) => {
    const onFinish = values => {
        const {username, password} = values;

        if (!username || !password) {
            return false;
        }

        userService.login(username, password).then(user => {
            if (user) {
                history.push("/")
            }
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-container">
            <div className="container">
                <h1>Connection</h1>
                <Form
                    {...layout}
                    name="login"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};

export default withRouter(LoginPage);
