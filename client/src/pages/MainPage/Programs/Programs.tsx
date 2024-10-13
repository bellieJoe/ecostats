import { Button, Card, Col, Drawer, Flex, Grid, Input, Layout, message, Row, Select, Space, Statistic } from "antd";
import Title from "antd/es/typography/Title";
import CreateProgram from "../../../components/MainPage/CreateProgram";
import CreateUnit from "../../../components/MainPage/CreateUnit";
import AssignHeads from "../../../components/MainPage/AssignHeads";
import { useEffect, useState } from "react";
import ProgramLists from "../../../components/MainPage/ProgramLists";
import { countPrograms } from "../../../services/api/programApi";
import { countUnits } from "../../../services/api/unitApi";


const Programs = () => {

    const [drawerStates, setDraweStates] = useState({
        newProgram : false,
        newUnit : false,
        assignHead : false
    });
    
    const [messageApi, contextHolder] = message.useMessage();

    const [count, setCount] = useState({
        programs : 0,
        units : 0
    })
    

    useEffect(() => {
        countPrograms()
        .then(res => {setCount({...count, programs: res.data})})
        .catch(() => messageApi.error("Unexpected Error Occured"));
        countUnits()
        .then(res => {setCount({...count, units: res.data})})
        .catch(() => messageApi.error("Unexpected Error Occured"))
    }, [])

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
                                value={count.programs}
                                valueStyle={{ color: '#3f8600' }}
                                />
                                <Button style={{ marginTop: 16 }} variant="filled" >
                                    View Programs
                                </Button>
                            </Card>
                            <Card bordered={false}>
                                <Statistic
                                title="Units"
                                value={count.units}
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
                        <Space className="mb-4">
                            <Button  type="primary" className="w-fit" onClick={() => setDraweStates({...drawerStates, newProgram:true})}>Create Program</Button>
                            <Button type="primary" className="w-fit" onClick={() => setDraweStates({...drawerStates, newUnit:true})}>Create Unit</Button>
                            <Button className="w-fit" onClick={() => setDraweStates({...drawerStates, assignHead:true})}>Assign Head</Button>
                        </Space>
                        <ProgramLists />
                        <ProgramLists />
                    </Layout>
                </Layout>
            </div>

            <Drawer open={drawerStates.newProgram} onClose={() => setDraweStates({...drawerStates, newProgram:false})} >
                <CreateProgram />
            </Drawer>
            <Drawer open={drawerStates.newUnit} onClose={() => setDraweStates({...drawerStates, newUnit:false})} >
                <CreateUnit />
            </Drawer>
            <Drawer open={drawerStates.assignHead} onClose={() => setDraweStates({...drawerStates, assignHead:false})} >
                <AssignHeads />
            </Drawer>
        </>
    );
}

export default Programs;