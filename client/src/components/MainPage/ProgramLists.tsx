import { useEffect, useState } from "react";
import { activateUser, deactivateUser, getAllUsers } from "../../services/api/userApi";
import { Button, message, Popconfirm, Space, Switch, Table, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import EditUserRole from "./EditUserRole";
import { useEditRoleStore } from "../../stores/useRoleStore";
import Search from "antd/es/input/Search";
import { useEditUserStore, useViewUsersStore } from "../../stores/useUserStore";
import EditUserDetails from "./EditUserDetails";
import { getAllPrograms } from "../../services/api/programApi";
import { useProgramHeadStore, useProgramsStore } from "../../stores/useProgramStore";
import ProgramHeadList from "./ProgramHeadList";

interface DataSource {
    key: string
    name: string
}

const ProgramLists = () => {
    const [ page, setPage ] = useState(1);
    const [ limit ] = useState(10);
    const [ total, setTotal ] = useState(0);
    const programStore = useProgramsStore();
    const [messageApi, contextHolder] = message.useMessage()
    const [dataSource, setDataSource] = useState<DataSource[]>([]);
    const [ isProgramsLoading, setIsProgramsLoading ] = useState(false);
    const programHeadStore = useProgramHeadStore()

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'action',
            render : (record : DataSource) => {
                return (
                    <Space>
                        <Button size="small" onClick={() => programHeadStore.setProgram(record.key, record.name)}>Program Head/s</Button>
                        <Button size="small" >Units</Button>
                    </Space>
                )
            }
        }
       
    ];

    useEffect(() => {
        setIsProgramsLoading(true)
        getAllPrograms(page, limit)
        .then(res => {
            programStore.setPrograms(res.data.programs)
            setTotal(res.data.total)
        })
        .catch(err => messageApi.error("Unexpected error occured while loading the programs."))
        .finally(() => {
            setIsProgramsLoading(false)
        });
        
    }, [page]);

    useEffect(() => {
        const d : any[]  = programStore.programs.map((val, i) => {
            return  {
                key: val._id,
                name: val.name
            }
        })
        setDataSource(d);
    }, [programStore.programs])

    return (
        <>
            {contextHolder}
            <Title level={5} >Programs</Title>
            <Table 
            loading={isProgramsLoading}
            dataSource={dataSource} 
            columns={columns} 
            pagination={{
                current: page,
                pageSize: limit,
                total: total,
                onChange: (page) => setPage(page)
            }} />

            <ProgramHeadList />

        </>
    )
}

export default ProgramLists;