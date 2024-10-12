import { Avatar, Button, ConfigProvider, ConfigProviderProps, Grid, Layout, Menu, MenuProps, Space, theme, ThemeConfig } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Navbar from "../../components/Home/Navbar/Navbar";
import { FolderOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusSquareOutlined, PushpinOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RouteGuard from "../../components/Guards/RouteGuard";
import SidebarUser from "../../components/MainPage/SidebarUser";
import { refreshToken as _refreshToken } from "../../services/api/userApi";
import { useAuthStore } from "../../stores/useAuthStore";

type MenuItem = Required<MenuProps>['items'][number];


const MainPage = () => {
    const navigate = useNavigate();

    const menuStyle1 : React.CSSProperties = {
        fontWeight: "bold"
    };
    const menuStyle2 : React.CSSProperties = {
        fontWeight: "normal"
    };

    const [isIdle, setIsIdle] = useState(false)

    const { refreshToken, setTokens, clearTokens } = useAuthStore();

    const [collapsed, setCollapsed] = useState(true);
    
    const { useBreakpoint } = Grid;

    const screens = useBreakpoint();

    useEffect(() => {
        if(screens.lg){
            console.log("collapse")
            setCollapsed(false)
        }
        else{
            setCollapsed(true)
        }
    }, [screens])

    useEffect(() => {
        const interval = setInterval(() => {
            if(!isIdle){
                _refreshToken({refreshToken: refreshToken!})
                .then(token => {
                    setTokens(token!)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }, 10000);
        // Clean up the interval on unmount
        return () => clearInterval(interval);
    }, [refreshToken, isIdle]);

    const items: MenuItem[] = [
        {
            key: "dashboard",
            label: "Dashboard",
            icon: <HomeOutlined />,
            style: menuStyle1,
            onClick: () => navigate("")
        },
        {
            key: "users",
            label: "Users",
            icon: <UserOutlined />,
            style: menuStyle1,
            onClick: () => navigate("users"),
            children: [
                {
                    key: "all-users",
                    label: "All",
                    style: menuStyle2
                }
            ]
        },
        {
            type: "divider"
        },
        {
            key: "programs",
            label: "Programs",
            icon: <FolderOutlined />,
            style: menuStyle1,
            children: [
                {
                    key: "create-program",
                    label: "Create New",
                    icon: <PlusSquareOutlined />,
                    style: menuStyle2
                }
            ]
        },
        {
            type: "divider"
        },
        {
            key: "land-management",
            label: "Land Management",
            icon: <PushpinOutlined />,
            style: menuStyle1,
            children: [
                {
                    key: "create-program",
                    label: "Create New",
                    icon: <PlusSquareOutlined />,
                    style: menuStyle2
                }
            ]
        },
        {
            key: "forestry-management",
            label: "Forestry Management",
            icon: <PushpinOutlined />,
            style: menuStyle1,
            children: [
                {
                    key: "create-program",
                    label: "Create New",
                    icon: <PlusSquareOutlined />
                }
            ]
        },
        {
            key: "biodivesity-management",
            label: "Biodoversity Management",
            icon: <PushpinOutlined />,
            style: menuStyle1,
            children: [
                {
                    key: "create",
                    label: "Create New",
                    icon: <PlusSquareOutlined />,
                    style: menuStyle2
                }
            ]
        }
    ];

    const theme : ThemeConfig = {
        "token": {
            "colorPrimary": "#254d27",
            "colorInfo": "#254d27",
            "wireframe": false
        },
        "components": {
            "Layout": {
                "siderBg": "rgb(37,77,39)",
                "algorithm": true
            },
            "Menu": {
                "itemBg": "rgb(37,77,39)",
                "itemColor": "rgba(255,255,255,0.88)",
                "itemDisabledColor": "rgba(189,189,189,0.25)",
                "itemHoverBg": "rgba(25,111,29,0.92)",
                "itemHoverColor": "rgba(215,215,215,0.88)",
                "itemSelectedBg": "rgb(29,156,36)",
                "itemSelectedColor": "rgb(255,255,255)",
                "itemActiveBg": "rgb(30,120,34)",
                "groupTitleColor": "rgba(255,255,255,0.67)"
            }
        }
    }


    return (
        <>
            <RouteGuard redirectTo="/error/401">
                <Layout style={{height: "100vh"}} onClick={() => setIsIdle(false)}>
                    
                    <Navbar />      
                    <Layout>
                        <ConfigProvider
                            theme={theme}
                            >
                            <Sider 
                            theme="dark" 
                            width="300" 
                            className="overflow-y-scroll"
                            collapsedWidth={0}
                            collapsible
                            collapsed={collapsed}
                            trigger={null}>
                                <div style={{padding: "0.5rem"}} >
                                    <SidebarUser />
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        style={{ borderRight: 0 }}
                                        items={items}
                                    />
                                </div>
                            </Sider>
                        </ConfigProvider>
                        <Layout >
                            <Content style={{padding: "1rem", overflow: "scroll"}}>
                            <Button
                                    type="text"
                                    size="small"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        padding: "1rem"
                                    }}
                                />
                                <Outlet />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </RouteGuard>
        </>
    )
}

export default MainPage;