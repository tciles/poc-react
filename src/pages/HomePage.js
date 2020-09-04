import React, {useState} from "react"
import {Layout, Menu, Breadcrumb} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import './HomePage.css';
import stagiairesProvider from "../providers/stagiairesProvider";
import withAuthenticateUser from "../hoc/withAuthenticateUser";
import {Link, withRouter} from "react-router-dom"
import StagiairesTable from "../component/StagiairesTable";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const HomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [stagiaires, setStagiaires] = useState([]);

    let user = localStorage.getItem('user')
    user = JSON.parse(user);

    stagiairesProvider().then(data => { setStagiaires(data) });

    const theme = "dark";

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(isCollapsed) => { setCollapsed(isCollapsed) }} theme={theme}>
                <div className="logo" />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    theme={theme}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Stagiaires">
                        <Menu.Item key="1">Liste</Menu.Item>
                        {/*<Menu.Item key="2">option2</Menu.Item>*/}
                        {/*<Menu.Item key="3">option3</Menu.Item>*/}
                        {/*<Menu.Item key="4">option4</Menu.Item>*/}
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background">
                    <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{textAlign: "right"}}>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title={user.firstname + " " + user.lastname.toUpperCase()}>
                            <Menu.Item key="2"><Link to="/logout">Déconnection</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>

                <Content
                    style={{
                        padding: "0 24px",
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Stagiaires</Breadcrumb.Item>
                    </Breadcrumb>

                    <StagiairesTable stagiaires={stagiaires}/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    &copy;2020 Created by <a href="https://www.alpes-controles.fr" target="_blank">Bureau Alpes Contr&ocirc;les</a>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default withAuthenticateUser(withRouter(HomePage), {
    redirectTo: "/login"
});
