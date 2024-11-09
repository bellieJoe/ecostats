import { ConfigProvider, Menu, ThemeConfig } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarUser from "../SidebarUser";
import { FormEnum, Sector } from "../../types/forms/formNameEnum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faList, faMagnifyingGlass, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../stores/useAuthStore";
import { getProgramByQuery } from "../../services/api/programApi";
import { getUnitsByQuery } from "../../services/api/unitApi";
import _ from "lodash";
import { focalPersonGetByQuery } from "../../services/api/focalPersonApi";

const ReportsSidebar = ({open}) => {
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

    const initSidebar = async () => {
        const it : any[] = [];
        if(["planning officer", "chief"].includes(authStore.user?.role!)){
            it.push({
                key: "reports",
                label : "Reports",
                icon : <FontAwesomeIcon icon={faFile} />,
                style: menuStyle1,
                children : [
                    {
                        key : "to-review",
                        label : "To Review",
                        icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
                        style: menuStyle2,
                        onClick : () => navigate(`/reports/to-review`)
                    },
                    {
                        key : "to-approve",
                        label : "To Approve",
                        icon: <FontAwesomeIcon icon={faThumbsUp} />,
                        style: menuStyle2,
                        onClick : () => navigate(`/reports/to-approve`)
                    },
                ]
            });
        }

        const programs = await getProgramByQuery({programHead : authStore.user?._id!, deletedAt : null}, []);
        const units = await getUnitsByQuery({unitHead : authStore.user?._id!, deletedAt : null}, ["programId"]);
        const fp = await focalPersonGetByQuery(
            {
                userId : authStore.user?._id,
                deletedAt : null
            }, 
            [
                {
                    path: "unitId",
                    populate : {
                        path: "programId"
                    }
                }
            ]
        );

        const sectorAccess = [...programs.data.map(a => a.management), ...units.data.map(a => a.programId.management), ...fp.data.map(a => a.unitId.programId.management)]
        if(sectorAccess.includes(Sector.LAND) || ["planning officer", "admin"].includes(authStore.user?.role!)){
            it.push({
                key: Sector.LAND,
                label: "Land Sector",
                icon: <FontAwesomeIcon icon={faList} />,
                style: menuStyle1,
                role : ["admin", "planning officer", "chief", "focal"],
                children : [
                    {
                        key  : "Land Management",
                        label : "A. Land Management",
                        style : menuStyle2,
                        children : [
                            {
                                key : FormEnum.LAND_1,
                                label : "Table 1. Land Area",
                                style  : menuStyle2,
                                onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_1}`)
                            },
                            {
                                key : FormEnum.LAND_2,
                                label : "Table 2. Patrimonial Properties",
                                style  : menuStyle2,
                                onClick : () => navigate(`/reports/${Sector.LAND}/${FormEnum.LAND_2}`)
                            },
                        ]
                    },
                    {
                        key: "Land Management Disposition",
                        label: "B. Land Management Disposition",
                        style: menuStyle2,
                        children : [
                            {
                                key : "Patentatable Land Disposition",
                                label : "a. Patentatable Land Disposition",
                                children : [
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
                                ]
                            },
                            {
                                key: "Non-Patentatable Land Disposition",
                                label: "b. Non-Patentatable Land Disposition",
                                children : [
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
                            }
                        ]
                    },
                ]
            })
        }
        if(sectorAccess.includes(Sector.FORESTRY) || ["planning officer", "admin"].includes(authStore.user?.role!)){
            it.push({
                key: Sector.FORESTRY,
                label: "Forestry Sector",
                icon: <FontAwesomeIcon icon={faList} />,
                style: menuStyle1,
                role : ["admin", "planning officer", "chief", "focal"],
                children: [
                    {
                        key : "Forest Resources",
                        label : "A. Forest Resources",
                        style  : menuStyle2,
                        children : [
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
                        ]
                    },
                    {
                        key: "Tenural Instruments",
                        label: "B. Tenural Instruments",
                        style  : menuStyle2,
                        children: [
                            {
                                key: FormEnum.FORESTRY_6,
                                label: "Table 6. Existing Community-Based Forest Management Agreement",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_6}`)
                            },
                            {
                                key: FormEnum.FORESTRY_7,
                                label: "Table 7. Community Forest Stewardship Agreement",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_7}`)
                            },
                            {
                                key: FormEnum.FORESTRY_8,
                                label: "Table 8. Existing Agroforestry Land Management Agreement",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_8}`)
                            },
                            {
                                key: FormEnum.FORESTRY_9,
                                label: "Table 9. Existing Integrated Social Forestry (ISF)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_9}`)
                            },
                            {
                                key: FormEnum.FORESTRY_10,
                                label: "Table 10. Forest land Grazing Lease Agreement (FLGLA)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_10}`)
                            },
                            {
                                key: FormEnum.FORESTRY_11,
                                label: "Table 11. Existing Forest Land Grazing Management Agreement (FLGMA)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_11}`)
                            },
                            {
                                key: FormEnum.FORESTRY_12,
                                label: "Table 12. Existing Forest Land Management Agreement (FLMA)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_12}`)
                            },
                            {
                                key: FormEnum.FORESTRY_13,
                                label: "Table 13. Existing Forest Land Protection Agreement (FLPA)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_13}`)
                            },
                            {
                                key: FormEnum.FORESTRY_14,
                                label: "Table 14. Existing Forest Land Use Agreement for Tourism Purposes (FLAgT)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_14}`)
                            },
                            {
                                key: FormEnum.FORESTRY_15,
                                label: "Table 15. Existing Integrated Forest Management Agreement (IFMA)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_15}`)
                            },
                            {
                                key: FormEnum.FORESTRY_16,
                                label: "Table 16. Industrial Tree Plantation Lease Agreement (ITPLA)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_16}`)
                            },
                            {
                                key: FormEnum.FORESTRY_17,
                                label: "Table 17. Gratuitous Permit for the Special Uses of Forest Lands (GSUP)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_17}`)
                            },
                            {
                                key: FormEnum.FORESTRY_18,
                                label: "Table 18. Socialized Industrial Forest Management Agreement (SIFMA)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_18}`)
                            },
                            {
                                key: FormEnum.FORESTRY_19,
                                label: "Table 19. Special Land Use Permit (SLUP)",
                                style: menuStyle2,
                                onClick: () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_19}`)
                            }
                            
                            
                        ]
                    },
                    
                    {
                        key : FormEnum.FORESTRY_24,
                        label : "Table 24. Issued Chainsaw Registration",
                        style  : menuStyle2,
                        onClick : () => navigate(`/reports/${Sector.FORESTRY}/${FormEnum.FORESTRY_24}`)
                    },
                ]
            })
        }
        if(sectorAccess.includes(Sector.BIODIVERSITY) || ["planning officer", "admin"].includes(authStore.user?.role!)){
            it.push({
                key: Sector.BIODIVERSITY,
                label: "Biodiversity Sector",
                icon: <FontAwesomeIcon icon={faList} />,
                style: menuStyle1,
                role : ["admin", "planning officer", "chief", "focal"],
                children: [
                    {
                        key: "Coastal Resource Management",
                        label: "B. Coastal Resource Management",
                        style: menuStyle2,
                        children : [
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
                        ]
                    },
                    {
                        key : "Biodiversity Conservation and Wildlife Management",
                        label : "C. Biodiversity Conservation and Wildlife Management",
                        style  : menuStyle2,
                        children : [
                            {
                                key : "Caves and Inland Wetlands",
                                label : "a. Caves and Inland Wetlands",
                                children : [
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
                            {
                                key : "Critical Habitats",
                                label : "b. Critical Habitats",
                                children : [
                                    {
                                        key : FormEnum.BIODIVERSITY_10,
                                        label : "Table 10. Identified/Assessed Critical Habitats",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_10}`)
                                    },
                                ]
                            },
                            {
                                key : "Wildlife Registration and Permits",
                                label : "c. Wildlife Registration and Permits",
                                children : [
                                    {
                                        key : FormEnum.BIODIVERSITY_11,
                                        label : "Table 11. Certificate of Wildlife Registration",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_11}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_12,
                                        label : "Table 12. Wildlife Import/Export/Re-Export Permit",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_12}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_15,
                                        label : "Table 15. Wildlife Collector's Permit (WCP)",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_15}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_16,
                                        label : "Table 16. Gratuitous Permit (GP)",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_16}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_17,
                                        label : "Table 17. Wildlife Special Use Permit",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_17}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_19,
                                        label : "Table 19. Wildlife Farm Permit",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_19}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_20,
                                        label : "Table 20. Wildlife Culture Permit",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_20}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_21,
                                        label : "Table 21. Clearance to Operate (for Zoological Parks and Botanical Gardens)",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_21}`)
                                    },
                                ]
                            },
                            {
                                key : "Flora and Fauna", 
                                label : "d. Flora and Fauna",
                                children : [
                                    {
                                        key : FormEnum.BIODIVERSITY_22,
                                        label : "Table 22. Known Fauna Species by Taxonomic Group",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_22}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_23,
                                        label : "Table 23. Known Flora Species by Taxonomic Group",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_23}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_24,
                                        label : "Table 24. Endemic Fauna Species by Taxonomic Group",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_24}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_25,
                                        label : "Table 25. Endemic Flora Species by Taxonomic Group",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_25}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_26,
                                        label : "Table 26. Wild Flora Confiscation",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_26}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_27,
                                        label : "Table 27. Wild Fauna Confiscation",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_27}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_28,
                                        label : "Table 28. Wild Fauna Retrieval and Donation",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_28}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_29,
                                        label : "Table 29. Wild Flora Retrieval and Donation",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_29}`)
                                    },
                                ]
                            },
                            {
                                key : "Wildlife Rescue and Retrieval",
                                label : "e. Wildlife Rescue and Retrieval",
                                children : [
                                    {
                                        key : FormEnum.BIODIVERSITY_30,
                                        label : "Table 30. Inventory of Wildlife at DENR Established Wildlife Rescue Centers",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_30}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_31,
                                        label : "Table 31. Population of Threatened Species",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_31}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_32,
                                        label : "Table 32. Marine Turtles Tagged and Released",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_32}`)
                                    },
                                    {
                                        key : FormEnum.BIODIVERSITY_33,
                                        label : "Table 33. Stranded Marine Turtle",
                                        style  : menuStyle2,
                                        onClick : () => navigate(`/reports/${Sector.BIODIVERSITY}/${FormEnum.BIODIVERSITY_33}`)
                                    },
                                ]
                            }
                        ]
                    }, 
                ]
            })
        }

        setItems(it);
    }

    useEffect(()=>{
        
        initSidebar();
    }, [authStore.user]);

    return (
        <>
            <ConfigProvider
                theme={theme}
                >
                <Sider  
                theme="dark" 
                width="400" 
                className="overflow-y-scroll"
                collapsedWidth={0}
                collapsible
                collapsed={collapsed}
                trigger={null}>
                    <div style={{padding: "0.5rem"}} >
                        <SidebarUser />
                        <Menu
                            className="w-full"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ borderRight: 0}}
                            items={items}
                            
                        />
                    </div>
                </Sider>
            </ConfigProvider>
        </>
    )
}

export default ReportsSidebar;