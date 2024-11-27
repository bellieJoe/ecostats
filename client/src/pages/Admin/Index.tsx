import { Card, Col, Layout, Row } from "antd";
import Title from "antd/es/typography/Title";
import penro from "../../../public/penro.jpg";
import Time from "../../components/Time";

const Index = () => {
    return (
    <>
        <Layout>
            <Layout.Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Time />
                    <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-lime-700 rounded mb-4 shadow-lg">
                        <img src={penro} alt="Penro" className="w-20 h-20 rounded-full md:mr-4" />
                        <div className="md:mt-0 mt-4 ">
                            <Title level={1} className="!text-white">ADMIN MANAGEMENT</Title>
                            <p className="text-white text-center md:text-left">Welcome to the Admin Management page. This page is designed for authorized personnel to manage users, programs, and reports configuration.</p>
                        </div>
                    </div>

                    <Title level={4}>Features</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="User Management" bordered={false} style={{ height: '220px' }}>
                                Manage users, including adding, editing, or deleting users, and assigning them roles.
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Program Management" bordered={false} style={{ height: '220px' }}>
                                Manage programs, including adding, editing, or deleting programs, and assigning them to users.
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Reports Configuration" bordered={false} style={{ height: '220px' }}>
                                Configure reports, including adding, editing, or deleting reports, and assigning them to programs.
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout.Content>
        </Layout>
        
    </>
    )
}

export default Index;