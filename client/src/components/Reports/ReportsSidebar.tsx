import { ConfigProvider, Menu, MenuProps, ThemeConfig } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { FolderOutlined, HomeOutlined, PlusSquareOutlined, PushpinOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import SidebarUser from "../SidebarUser";
import { FormEnum, Sector } from "../../types/forms/formNameEnum";


type MenuItem = Required<MenuProps>['items'][number];

const ReportsSidebar = ({open}) => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(true);

    const menuStyle1 : React.CSSProperties = {
        fontWeight: "bold"
    };
    const menuStyle2 : React.CSSProperties = {
        fontWeight: "normal"
    };

    const items: MenuItem[] = [
        {
            key: Sector.LAND,
            label: "Land Managenent",
            icon: <UserOutlined />,
            style: menuStyle1,
            children : [
                {
                    key : FormEnum.LAND_1,
                    label : "Table 1",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_1}`)
                },
                {
                    key : FormEnum.LAND_2,
                    label : "Table 2",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_2}`)
                },
                {
                    key : FormEnum.LAND_3,
                    label : "Table 3",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_3}`)
                },
                {
                    key : FormEnum.LAND_4,
                    label : "Table 4",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_4}`)
                },
                {
                    key : FormEnum.LAND_5,
                    label : "Table 5",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_5}`)
                },
                {
                    key : FormEnum.LAND_6,
                    label : "Table 6",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_6}`)
                },
                {
                    key : FormEnum.LAND_7,
                    label : "Table 7",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_7}`)
                },
            ]
        },

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

export default ReportsSidebar;