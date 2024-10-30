import { ConfigProvider, Menu, ThemeConfig } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarUser from "../SidebarUser";
import { FormEnum, Sector } from "../../types/forms/formNameEnum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faList } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../stores/useAuthStore";
import _ from "lodash"
import Title from "antd/es/typography/Title";

const DashboardSidebar = ({open}) => {
    const navigate = useNavigate();
    const authStore = useAuthStore();

    const [collapsed, setCollapsed] = useState(true);

    const menuStyle1 : React.CSSProperties = {
        fontWeight: "bold"
    };
    const menuStyle2 : React.CSSProperties = {
        fontWeight: "normal"
    };

    const [items, setItems] = useState<any[]>([
       
    ]);

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

    useEffect(() => setCollapsed(open), [open]);

    useEffect(()=>{
        const i = [
            {
                key: "overview",
                label : "Overview",
                icon : <FontAwesomeIcon icon={faFile} />,
                style: menuStyle1,
                role : ["admin", "planning officer", "chief"],
                onClick : () => navigate(`/dashboard`)
            },
            {
                key: Sector.LAND,
                label: "Land Managenent",
                icon: <FontAwesomeIcon icon={faList} />,
                style: menuStyle1,
                role : ["admin", "planning officer", "chief", "focal"],
                children : [
                    {
                        key : FormEnum.LAND_1,
                        label : "Land Area",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.LAND_1}`)
                    },
                    {
                        key : FormEnum.LAND_2,
                        label : "Patrimonial Properties",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.LAND_2}`)
                    },
                    {
                        key : FormEnum.LAND_3,
                        label : "Residential Free Patent Issued",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.LAND_3}`)
                    },
                    {
                        key : FormEnum.LAND_4,
                        label : "Agricultural Free Patent Issued",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.LAND_4}`)
                    },
                    {
                        key : FormEnum.LAND_5,
                        label : "Homestead",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.LAND_5}`)
                    },
                    {
                        key : FormEnum.LAND_6,
                        label : "List of Special Patent of LGUs and NGAs",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.LAND_6}`)
                    },
                    {
                        key : FormEnum.LAND_7,
                        label : "Management of Foreshore Areas",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.LAND_7}`)
                    },
                ]
            },
            {
                key: Sector.FORESTRY,
                label: "Forestry Management",
                icon: <FontAwesomeIcon icon={faList} />,
                style: menuStyle1,
                role : ["admin", "planning officer", "chief", "focal"],
                children: [
                    {
                        key : FormEnum.FORESTRY_1,
                        label : "Land Classification",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.FORESTRY_1}`)
                    },
                    {
                        key : FormEnum.FORESTRY_2,
                        label : "Land Cover",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.FORESTRY_2}`)
                    },
                    {
                        key : FormEnum.FORESTRY_3,
                        label : "Production and Protection Forest (Hectares)",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.FORESTRY_3}`)
                    },
                    {
                        key : FormEnum.FORESTRY_4,
                        label : "Proclaimed Watershed Forest Reserve",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.FORESTRY_4}`)
                    },
                    {
                        key : FormEnum.FORESTRY_5,
                        label : "Priority Critical Watershed Supporting National Irrigation System",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.FORESTRY_5}`)
                    },
    
    
                    {
                        key : FormEnum.FORESTRY_24,
                        label : "Issued Chainsaw Registration",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.FORESTRY_24}`)
                    },
                ]
            },
            {
                key: Sector.BIODIVERSITY,
                label: "Biodiversity Management",
                icon: <FontAwesomeIcon icon={faList} />,
                style: menuStyle1,
                role : ["admin", "planning officer", "chief", "focal"],
                children: [
                    {
                        key : FormEnum.BIODIVERSITY_2,
                        label : "Area Distribution of Coastal Resources",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_2}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_3,
                        label : "Inventory of Coral Reef",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_3}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_4,
                        label : "Inventory of Seagrass",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_4}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_5,
                        label : "Mangrove Assessment",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_5}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_6,
                        label : "Mangrove Area Rehabilitated",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_6}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_7,
                        label : "Livelihood Projects Implemented in Coastal Areas",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_7}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_8,
                        label : "Inland Wetland in the Region",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_8}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_9,
                        label : "Classified Caves",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_9}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_10,
                        label : "Identified/Assessed Critical Habitats",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_10}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_11,
                        label : "Certificate of Wildlife Registration",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_11}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_12,
                        label : "Wildlife Import/Export/Re-Export Permit",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_12}`)
                    },

                    {
                        key : FormEnum.BIODIVERSITY_15,
                        label : "Wildlife Collector's Permit (WCP)",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_15}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_16,
                        label : "Gratuitous Permit (GP)",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_16}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_17,
                        label : "Wildlife Special Use Permit",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_17}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_19,
                        label : "Wildlife Farm Permit",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_19}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_20,
                        label : "Wildlife Culture Permit",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_20}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_21,
                        label : "Clearance to Operate (for Zoological Parks and Botanical Gardens)",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_21}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_22,
                        label : "Known Fauna Species by Taxonomic Group",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_22}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_23,
                        label : "Known Flora Species by Taxonomic Group",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_23}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_24,
                        label : "Endemic Fauna Species by Taxonomic Group",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_24}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_25,
                        label : "Endemic Flora Species by Taxonomic Group",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_25}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_26,
                        label : "Wild Flora Confiscation",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_26}`)
                    },
                    {
                        key : FormEnum.BIODIVERSITY_27,
                        label : "Wild Fauna Confiscation",
                        style  : menuStyle2,
                        onClick : () => navigate(`/dashboard/${FormEnum.BIODIVERSITY_27}`)
                    },
                ]
            },
        ];
        setItems([...i.filter(i => i.role.includes(authStore.user?.role!))])
        
    }, [authStore.user]);

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
                    <Title className="my-4" level={5} style={{color: "white"}}>Dashboard</Title>
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

export default DashboardSidebar;