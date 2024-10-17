import { ConfigProvider, Menu, MenuProps, ThemeConfig } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { FolderOutlined, HomeOutlined, PlusSquareOutlined, PushpinOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import SidebarUser from "../SidebarUser";
import { FormEnum, Sector } from "../../types/forms/formNameEnum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";


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
            icon: <FontAwesomeIcon icon={faList} />,
            style: menuStyle1,
            children : [
                {
                    key : FormEnum.LAND_1,
                    label : "Table 1. Land Area",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_1}`)
                },
                {
                    key : FormEnum.LAND_2,
                    label : "Table 2. Patrimonial Properties as of CY 2023",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_2}`)
                },
                {
                    key : FormEnum.LAND_3,
                    label : "Table 3. Residential Free Patent Issued",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_3}`)
                },
                {
                    key : FormEnum.LAND_4,
                    label : "Table 4. Agricultural Free Patent Issued",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_4}`)
                },
                {
                    key : FormEnum.LAND_5,
                    label : "Table 5. Homestead",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_5}`)
                },
                {
                    key : FormEnum.LAND_6,
                    label : "Table 6. List of Special Patent of LGUs and NGAs",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_6}`)
                },
                {
                    key : FormEnum.LAND_7,
                    label : "Table 7. Management of Foreshore Areas",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_7}`)
                },
            ]
        },
        {
            key: Sector.FORESTRY,
            label: "Forestry Management",
            icon: <FontAwesomeIcon icon={faList} />,
            style: menuStyle1,
            children: [
                {
                    key : FormEnum.FORESTRY_1,
                    label : "Table 1. Land Classification",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_1}`)
                },
                {
                    key : FormEnum.FORESTRY_2,
                    label : "Table 2. Land Cover",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_2}`)
                },
                {
                    key : FormEnum.FORESTRY_3,
                    label : "Table 3. Production and Protection Forest (Hectares)",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_3}`)
                },
                {
                    key : FormEnum.FORESTRY_4,
                    label : "Table 4. Proclaimed Watershed Forest Reserve",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_4}`)
                },
                {
                    key : FormEnum.FORESTRY_5,
                    label : "Table 5. Priority Critical Watershed Supporting National Irrigation System",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_5}`)
                },


                {
                    key : FormEnum.FORESTRY_24,
                    label : "Table 24. Issued Chainsaw Registration",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_24}`)
                },
            ]
        },
        {
            key: Sector.BIODIVERSITY,
            label: "Biodiversity Management",
            icon: <FontAwesomeIcon icon={faList} />,
            style: menuStyle1,
            children: [
                {
                    key : FormEnum.BIODIVERSITY_2,
                    label : "Table 2. Area Distribution of Coastal Resources",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_2}`)
                },
                {
                    key : FormEnum.BIODIVERSITY_3,
                    label : "Table 3. Inventory of Coral Reef",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_3}`)
                },
                {
                    key : FormEnum.BIODIVERSITY_4,
                    label : "Table 4. Inventory of Seagrass",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_4}`)
                },
                {
                    key : FormEnum.BIODIVERSITY_5,
                    label : "Table 5. Mangrove Assessment",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_5}`)
                },
                {
                    key : FormEnum.BIODIVERSITY_6,
                    label : "Table 6. Mangrove Area Rehabilitated",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_6}`)
                },
                {
                    key : FormEnum.BIODIVERSITY_7,
                    label : "Table 7. Livelihood Projects Implemented in Coastal Areas",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_7}`)
                },
                {
                    key : FormEnum.BIODIVERSITY_8,
                    label : "Table 8. Inland Wetland in the Region",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_8}`)
                },
                {
                    key : FormEnum.BIODIVERSITY_9,
                    label : "Table 9. Classified Caves",
                    style  : menuStyle2,
                    onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_9}`)
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