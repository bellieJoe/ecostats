import { Button, Grid, Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import RouteGuard from "../../components/Guards/RouteGuard";
import ReportsSidebar from "../../components/Reports/ReportsSidebar";


const Reports = () => {

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
    
    return (
        <RouteGuard redirectTo="/error/401">
            <Layout className="h-full">
                <ReportsSidebar open={collapsed} />
                <Layout>
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
        </RouteGuard>
    )
}

export default Reports;