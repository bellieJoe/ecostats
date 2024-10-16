import { ConfigProvider, Menu } from "antd";
import { useNavigate } from "react-router-dom";


const NavbarMenus = () => {

    const navigate  = useNavigate();

    const configTheme = {
        "token": {
          "colorPrimary": "#41a61d",
          "colorInfo": "#41a61d"
        },
        "components": {
          "Menu": {
            "itemBg": "rgb(247,247,186)",
            "itemColor": "rgba(4,164,47,0.88)",
            "itemSelectedColor": "rgb(1,27,63)",
            "popupBg": "rgb(247,247,186)",
            "itemSelectedBg": "rgba(230,244,255,0)",
            "horizontalItemSelectedColor": "rgb(1,23,54)"
          }
        }
    }

    const items  = [
        {
            key : "1",
            label : "Home"
        },
        {
            key : "2",
            label : "Admin",
            onClick: () => navigate("/admin")
        },
        {
            key : "3",
            label : "Reports",
            onClick: () => navigate("/reports")
        },
        {
            key : "4",
            label : "Dashboard"
        },
    ];


    return (
        <ConfigProvider theme={configTheme}>
            <Menu

                mode="horizontal"
                style={{
                    flex: 1,
                    justifyContent: "center",
                    // maxWidth: 100,
                    width :" 100%"
                }}
                items={items} />
        </ConfigProvider>
    )
}

export default NavbarMenus;