import { Layout } from "antd";
import Navbar from "../../components/Home/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";


const HomePage = () => {
    return (
        <>
            <Layout>
                <Navbar />
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </>
    )
}

export default HomePage;