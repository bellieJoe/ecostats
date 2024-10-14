import { useEffect, useState } from "react";
import { Alert, Button, Drawer, Flex, message, Popconfirm, Space, Table  } from "antd";
import Title from "antd/es/typography/Title";
import { deleteProgram, getAllPrograms } from "../../../services/api/programApi";
import { useProgramHeadStore, useProgramsStore, useUpdateProgramStore } from "../../../stores/useProgramStore";
import ProgramHeadList from "./ProgramHeadList";
import { useViewUnitsStore } from "../../../stores/useUnitStore";
import CreateUnit from "./CreateUnit";
import { parseResError } from "../../../services/errorHandler";
import { ReloadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import UpdateProgram from "./UpdateProgram";

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
    const programHeadStore = useProgramHeadStore();
    const viewUnitsStore = useViewUnitsStore();
    const [program, setProgram] = useState<{
        value : string,
        label : string
    } | null>(null);
    const updateProgramStore = useUpdateProgramStore();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Program Head',
            key: 'progrmaHead',
            render : (record : DataSource) => {
                return <Button size="small" onClick={() => programHeadStore.setProgram(record.key, record.name)}>Program Head/s</Button>
            }
        },
        {
            title: 'Units',
            key: 'progrmaHead',
            render : (record : DataSource) => {
                return (
                    <Space>
                        <Button size="small" onClick={() => viewUnitsStore.setProgram(record.key, record.name)}>Unit/s</Button>
                        <Button size="small" onClick={() => {
                            setProgram({value: record.key, label: record.name})
                        }}><FontAwesomeIcon icon={faPlus} />Add Unit</Button>
                    </Space>
                )
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render : (record : DataSource) => {
                return (
                    <Space>
                        <Button size="small" variant="solid" color="primary" onClick={() => updateProgramStore.settProgramId(record.key)}>Update</Button>
                        <Popconfirm 
                        title="Delete Program" 
                        onConfirm={() => handleDeleteProgram(record.key)}
                        placement="right" 
                        description={
                            <>
                                Are you sure you want to delete this program?<br /> <br />
                                <Alert type="warning" description="Note that this will also delete all associated units and program heads.." />
                            </>}>
                            <Button size="small" variant="filled" color="danger">Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
       
    ];
    const [refresh, setRefresh] = useState(false)

    const handleDeleteProgram = (id : string) => {
        deleteProgram(id)
        .then(() => {
            programStore.setPrograms(programStore.programs.filter(p => p._id != id))
            messageApi.success("Program successfully deleted.")
        })
        .catch(err => {
            messageApi.error(parseResError(err).msg)
        })
        .finally();
    }

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
        
    }, [page, refresh]);

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
            <Flex justify="right" className="mb-2">
                <Button variant="link" color="primary" size="small" icon={<FontAwesomeIcon icon={faArrowsRotate} />} onClick={() => setRefresh(!refresh)}>Refresh</Button>
            </Flex>
            <Table 
            sticky
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

            <Drawer open={!!program} onClose={() => setProgram(null)}>
                <CreateUnit program={program!} />
            </Drawer>

            <UpdateProgram onUpdated={(res) => setRefresh(!refresh)} />
        </>
    )
}

export default ProgramLists;
