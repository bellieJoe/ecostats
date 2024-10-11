import { useEffect, useState } from "react";
import { activateUser, deactivateUser, getAllUsers } from "../../../services/api/userApi";
import { Button, Drawer, Layout, message, Popconfirm, Space, Switch, Table, Tooltip, Typography } from "antd";
import { User } from "../../../types/User";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { getRolesByUserId } from "../../../services/api/roleApi";
import EditUserRole from "../../../components/MainPage/EditUserRole";
import { useEditRoleStore } from "../../../stores/useRoleStore";

interface DataSource {
    key: string
    name: string
    email: string
    isActive: boolean
}

const Users = () => {
    const [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(10);
    const [ total, setTotal ] = useState(0);
    const [ users, setUsers ] = useState<User[]>([]);
    const [messageApi, contextHolder] = message.useMessage()
    const [dataSource, setDataSource] = useState<DataSource[]>([]);
    const  { setUserId } = useEditRoleStore();


    const handleActivateUser = (id:string, toActivate : boolean) => {
        if(toActivate){
            activateUser(id)
            .then(() => {
                setDataSource(dataSource.map(val => {
                    if(val.key == id){
                        val.isActive = toActivate;
                    }
                    return val;
                }))
            })
            .catch(err => {
                messageApi.error(err.response.data.msg)
            })
        }
        if(!toActivate){
            deactivateUser(id)
            .then(() => {
                setDataSource(dataSource.map(val => {
                    if(val.key == id){
                        val.isActive = toActivate;
                    }
                    return val;
                }))
            })
            .catch(err => {
                messageApi.error(err.response.data.msg)
            })
        }
        
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            key: 'action',
            render : (record : DataSource) => {
                return (
                    <Space>
                        <Button size="small">Update</Button>
                        <Button size="small" onClick={() => setUserId(record.key)}>Roles</Button>
                    </Space>
                )
            }
        },
        {
            title: 'Status',
            key: 'status',
            render: (record : DataSource) => {
                return (
                    <Tooltip title="Activate or Deactivate user">
                        <Popconfirm
                            title={`${record.isActive ? "Deactivate" : "Activate"} User`}
                            description={`Are you sure to ${record.isActive ? "deactivate" : "activate"} this user?`}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleActivateUser(record.key, !record.isActive)}
                        >
                            <Switch size="small" checked={record.isActive} ></Switch>
                        </Popconfirm>
                    </Tooltip>
                )
            }
        },
    ];

    useEffect(() => {
        getAllUsers(page, limit)
        .then(data => {
            setUsers(data.users)
            setTotal(data.total)
        })
    }, [page]);

    useEffect(() => {
        const d : any[]  = users.map((val, i) => {
            return  {
                key: val._id,
                name: val.name,
                email: val.email,
                isActive: val.isActive,
            }
        })
        setDataSource(d);
    }, [users])

    return (
        <>
            {contextHolder}

            <Title level={3} >User Accounts</Title>

            <Table 
            dataSource={dataSource} 
            columns={columns} 
            pagination={{
                current: page,
                pageSize: limit,
                total: total,
                onChange: (page) => setPage(page)
            }} />

            <EditUserRole />
        </>
    )
}

export default Users;