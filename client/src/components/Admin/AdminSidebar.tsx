import { ConfigProvider, Menu, MenuProps, ThemeConfig } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { FolderOutlined, HomeOutlined, PlusSquareOutlined, PushpinOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import SidebarUser from "../SidebarUser";


type MenuItem = Required<MenuProps>['items'][number];

const AdminSidebar = ({open}) => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(true);

    const menuStyle1 : React.CSSProperties = {
        fontWeight: "bold"
    };

    const items: MenuItem[] = [
        {
            key: "users",
            label: "Users",
            icon: <UserOutlined />,
            style: menuStyle1,
            onClick: () => navigate("users")
        },
        {
            key: "programs",
            label: "Programs",
            icon: <FolderOutlined />,
            style: menuStyle1,
            onClick: () => navigate("programs")
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

    useEffect(() => setCollapsed(open), [open])

    return (
        <>
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
</>
    )
}

export default AdminSidebar;