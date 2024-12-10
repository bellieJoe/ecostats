import { Card, Col, Layout, Row } from "antd";
import Title from "antd/es/typography/Title";
import penro from "../../../public/penro.jpg";
import Time from "../../components/Time";


const ReportsIndex = () => {
    return (
    <>
        <Layout>
            <Layout.Content style={{ padding: '0 0px' }}>
                <div className="site-layout-content">

                    <Time />
                    <div className="flex flex-col md:flex-row items-center md:items-start p-6 bg-lime-700 rounded mb-4 shadow-lg">
                        <img src={penro} alt="Penro" className="w-20 h-20 rounded-full md:mr-4" />
                        <div className="md:mt-0 mt-4 ">
                            <Title level={1} className="!text-white">REPORTS MANAGEMENT</Title>
                            <p className="text-white text-center md:text-left">The Reports Management page allows you to manage and customize reports, including migrating data from existing forms to new forms, customizing the layout and fields of reports, and managing reports.</p>
                        </div>
                    </div>

                    <Title level={4}>Features</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Data Migration" bordered={false} style={{ height: '220px' }}>
                                Migrate data from existing forms to new forms, including mapping fields and values.
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Customize Reports" bordered={false} style={{ height: '220px' }}>
                                Customize the layout and fields of the reports, including adding, editing, or deleting fields.
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Manage Reports" bordered={false} style={{ height: '220px' }}>
                                Manage reports, including adding, editing, or deleting reports, and assigning them to users or programs.
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout.Content>
        </Layout>
        
    </>
    )
}

export default ReportsIndex;