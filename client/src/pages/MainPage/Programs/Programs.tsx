import { Button, Card, Flex, Input, Layout, Select, Space, Statistic } from "antd";
import Title from "antd/es/typography/Title";
import CreateProgram from "../../../components/MainPage/CreateProgram";


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
                        <Flex wrap align="start" gap={12} justify="space-evenly">
                            <CreateProgram />
                            <Card title="Create Units under Division" bordered={false}>
                                <Title level={5}>Select Division</Title>
                                <Select className="w-full" placeholder="Select Division" />

                                <br /><br />

                                <Title level={5}>Unit Name</Title>
                                <Input placeholder="Assign Unit Name" />

                                <br /><br />

                                <Title level={5}>Select Unit Head</Title>
                                <Select className="w-full" placeholder="Select Unit Head" />

                                <br /><br />

                                <Button className="w-full" type="primary">Create Unit</Button>
                            </Card>
                            <Card title="Assign Heads upon User Account Registration" bordered={false}>
                                <Title level={5}>User Account</Title>
                                <Select className="w-full" placeholder="Select Account" />

                                <br /><br />

                                <Title level={5}>Assign to Division</Title>
                                <Select className="w-full" placeholder="Select Division" />

                                <br /><br />

                                <Title level={5}>Assign to Unit </Title>
                                <Select className="w-full" placeholder="Select Unit" />

                                <br /><br />

                                <Button className="w-full" type="primary">Assign User</Button>
                            </Card>
                        </Flex>
                    </Layout>
                </Layout>
            </div>
        </>
    );
}

export default Programs;