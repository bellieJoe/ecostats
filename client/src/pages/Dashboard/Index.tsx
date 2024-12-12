import { Card, Col, Layout, Row } from "antd";
import Title from "antd/es/typography/Title";
import penro from "../../../public/penro.jpg";
import Time from "../../components/Time";
import { Bar, BarChart, CartesianAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DashboardIndex = () => {
    return (
    <>
        <Layout>
            <Layout.Content style={{ padding: '0 0px' }}>
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
                    <Row gutter={[16, 16]} className="mb-4">
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

                    <Title level={4}>Overview</Title>
                    <Card className="mb-4" title="Data Visualization by Sector" bordered={false}>
                        <ResponsiveContainer width={"100%"} height={300} >
                            <BarChart layout="horizontal" data={[
                                { name: 'Jan', uv: 1000 },
                                { name: 'Feb', uv: 2000 },
                                { name: 'Mar', uv: 3000 },
                                { name: 'Apr', uv: 4000 },
                                { name: 'May', uv: 5000 },
                                { name: 'Jun', uv: 6000 },
                                { name: 'Jul', uv: 7000 },
                                { name: 'Aug', uv: 8000 },
                                { name: 'Sep', uv: 9000 },
                                { name: 'Oct', uv: 10000 },
                                { name: 'Nov', uv: 11000 },
                                { name: 'Dec', uv: 12000 }
                            ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                                <CartesianGrid />
                                <YAxis type="number" dataKey={"uv"} /> 
                                <XAxis type="category" dataKey={"name"} /> 
                                <Legend />
                                <Tooltip />
                                <Bar dataKey={"uv"} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card title="Reports with Most Visualizations" bordered={false}>
                        <ResponsiveContainer width={"100%"} height={500} >
                            <BarChart layout="vertical" data={[
                                { name: 'Jan', uv: 1000 },
                                { name: 'Feb', uv: 2000 },
                                { name: 'Mar', uv: 3000 },
                                { name: 'Apr', uv: 4000 },
                                { name: 'May', uv: 5000 },
                            ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                                <CartesianGrid />
                                <YAxis type="category" dataKey={"name"} /> 
                                <XAxis type="number" dataKey={"uv"} /> 
                                <Legend />
                                <Tooltip />
                                <Bar dataKey={"uv"} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </Layout.Content>
        </Layout>
        
    </>
    )
}

export default DashboardIndex;