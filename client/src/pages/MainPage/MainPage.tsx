import { Button, Grid, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Navbar from "../../components/Home/Navbar/Navbar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import RouteGuard from "../../components/Guards/RouteGuard";
import { refreshToken as _refreshToken } from "../../services/api/userApi";
import { useAuthStore } from "../../stores/useAuthStore";
import Sidebar from "../../components/MainPage/Sidebar";

const MainPage = () => {

    const [isIdle, setIsIdle] = useState(false)

    const { refreshToken, setTokens } = useAuthStore();

    const [collapsed, setCollapsed] = useState(true);

    const { useBreakpoint } = Grid;

    const screens = useBreakpoint();
    
    useEffect(() => {
        if(screens.lg){
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
        return () => clearInterval(interval);
    }, [refreshToken, isIdle]);

    return (
        <>
            <RouteGuard redirectTo="/error/401">
                <Layout style={{height: "100vh"}} onClick={() => setIsIdle(false)}>
                    
                    <Navbar />      
                    <Layout>
                        <Sidebar open={collapsed} />
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