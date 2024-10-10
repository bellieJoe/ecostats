import { Layout } from "antd";
import Navbar from "../../components/Home/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";


const HomePage = () => {
    const layoutStyle : React.CSSProperties = {
        background: "url('/bg.jpg') no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
    }
    return (
        <>
            <Layout style={layoutStyle} >
                <Navbar />
                <Content style={{
                    height: "100%"
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </>
    )
}

export default HomePage;