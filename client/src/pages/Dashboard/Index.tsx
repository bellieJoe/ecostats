import { Card, Col, Layout, Row } from "antd";
import Title from "antd/es/typography/Title";
import penro from "../../../public/penro.jpg";
import Time from "../../components/Time";

const DashboardIndex = () => {
    return (
    <>
        <Layout>
            <Layout.Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Time />
                    <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-lime-700 rounded mb-4 shadow-lg">
                        <img src={penro} alt="Penro" className="w-20 h-20 rounded-full md:mr-4" />
                        <div className="md:mt-0 mt-4 ">
                            <Title level={1} className="!text-white">VISUALIZATIONS</Title>
                            <p className="text-white text-center md:text-left">A collection of dashboards showcasing data from various sources, from different PENRO Programs.</p>
                        </div>
                    </div>

                    <Title level={4}>Features</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Charts Rendering" bordered={false} style={{ height: '220px' }}>
                                Render charts based on data from various sources.
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Data Visualization" bordered={false} style={{ height: '220px' }}>
                                Visualize data in a way that helps users understand and make decisions.
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Customizable Dashboards" bordered={false} style={{ height: '220px' }}>
                                Allow users to customize their own dashboards with the charts and data they need.
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout.Content>
        </Layout>
        
    </>
    )
}

export default DashboardIndex;