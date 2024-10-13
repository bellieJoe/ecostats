import { Button, Card, Col, Flex, Grid, Input, Layout, Row, Select, Space, Statistic } from "antd";
import Title from "antd/es/typography/Title";
import CreateProgram from "../../../components/MainPage/CreateProgram";
import CreateUnit from "../../../components/MainPage/CreateUnit";
import AssignHeads from "../../../components/MainPage/AssignHeads";


const Programs = () => {
    return (
        <>
            <Title level={3} >Programs/Division</Title>
            <div className="">
                <Layout>
                    <Layout>
                        <Space>
                            <Card bordered={false}>
                                <Statistic
                                title="Programs"
                                value={1100}
                                valueStyle={{ color: '#3f8600' }}
                                />
                                <Button style={{ marginTop: 16 }} variant="filled" >
                                    View Programs
                                </Button>
                            </Card>
                            <Card bordered={false}>
                                <Statistic
                                title="Units"
                                value={1100}
                                valueStyle={{ color: '#3f8600' }}
                                />
                                <Button style={{ marginTop: 16 }} variant="filled" >
                                    View Units
                                </Button>
                            </Card>
                        </Space>
                    </Layout>
                    <br />
                    <Layout>
                        <Row gutter={[16,16]} >
                            <Col lg={8} md={12} xs={24}><CreateProgram /></Col>
                            <Col lg={8} md={12} xs={24}><CreateUnit /></Col>
                            <Col lg={8} md={12} xs={24}><AssignHeads /></Col>
                        </Row>
                    </Layout>
                </Layout>
            </div>
        </>
    );
}

export default Programs;