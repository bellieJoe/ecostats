import { useEffect, useRef, useState } from "react";
import { Button, Flex, message, Popconfirm, Space, Switch, Table, Tooltip } from "antd";
import { useUnitHeadStore, useUpdateUnitStore, useViewUnitsStore } from "../../../stores/useUnitStore";
import { deleteUnit, getByProgram } from "../../../services/api/unitApi";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { parseResError } from "../../../services/errorHandler";
import UpdateUnit from "./UpdateUnit";
import UnitHeadList from "./UnitHeadList";

interface DataSource {
    key: string
    name: string
}

const UnitsList = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [dataSource, setDataSource] = useState<DataSource[]>([]);
    const [ isUnitsLoading, setIsUnitsLoading ] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const viewUnitStore = useViewUnitsStore();
    const updateUnitStore = useUpdateUnitStore();
    const unitHeadStore = useUnitHeadStore();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Unit Head',
            key: 'progrmaHead',
            render : (record : DataSource) => {
                return <Button size="small" onClick={() => unitHeadStore.setUnit(record.key, record.name)}>Unit Head/s</Button>
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render : (record : DataSource) => {
                return (
                    <Space>
                        <Button size="small" variant="solid" color="primary" onClick={() => updateUnitStore.setUnitId(record.key)}>Update</Button>
                        <Popconfirm title="Delete Unit" description="Are you sure you want to delete this unit?" onConfirm={() => handleDeleteUnit(record.key)}>
                            <Button size="small" variant="filled" color="danger">Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
       
    ];

    const handleDeleteUnit = (id : string) => {
        deleteUnit(id)
        .then(() => {
            viewUnitStore.setUnits(viewUnitStore.units.filter(p => p._id != id))
            messageApi.success("Unit successfully deleted.")
            setRefresh(!refresh)
        })
        .catch(err => {
            messageApi.error(parseResError(err).msg)
        })
        .finally();
    }

    useEffect(() => {
        if(viewUnitStore.programId){
            setIsUnitsLoading(true);
            getByProgram(viewUnitStore.page, viewUnitStore.limit, viewUnitStore.programId)
            .then(res => {
                viewUnitStore.setUnits(res.data.units)
                viewUnitStore.setTotal(res.data.total)
            })
            .catch(err => {
                messageApi.error("Unexpected error occured while loading the programs.")
            })
            .finally(() => {
                setIsUnitsLoading(false)
            });
        }
        
    }, [viewUnitStore.page, viewUnitStore.programId, refresh]);

    useEffect(() => {
        console.log(viewUnitStore.units)
        const d : any[]  = viewUnitStore.units.map((val) => {
            return  {
                key: val._id,
                name: val.name
            }
        })
        setDataSource(d);
        location.href = "/admin/programs#unitsTable"
    }, [viewUnitStore.units])

    return (
        <>
            {contextHolder}
            <Title level={5} >Units</Title>
            {
                viewUnitStore.programId && <div className="mb-2"><span className="font-semibold">Program :</span> {viewUnitStore.programName}</div> 
            }
            <Flex justify="right" className="mb-2">
                <Button variant="text" color="primary" type="text" size="small" icon={<FontAwesomeIcon icon={faArrowsRotate} />} onClick={() => setRefresh(!refresh)}>Refresh</Button>
            </Flex>
            <Table 
            id="unitsTable"
            sticky
            locale={{
                emptyText : viewUnitStore.programId ? "No Units under this program" : "Select a program above to view units."
            }}
            loading={isUnitsLoading}
            dataSource={dataSource} 
            columns={columns} 
            pagination={{
                current: viewUnitStore.page,
                pageSize: viewUnitStore.limit,
                total: viewUnitStore.total,
                onChange: (page) => viewUnitStore.setPage(page)
            }} />

            <UpdateUnit onUpdated={() => setRefresh(!refresh)} />

            <UnitHeadList />
        </>
    )
}

export default UnitsList;