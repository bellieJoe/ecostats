import { useEffect, useState } from "react";
import { activateUser, deactivateUser, getAllUsers } from "../../../services/api/userApi";
import { Button, message, Popconfirm, Space, Switch, Table, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import EditUserRole from "../../../components/MainPage/Users/EditUserRole";
import { useEditRoleStore } from "../../../stores/useRoleStore";
import Search from "antd/es/input/Search";
import { useEditUserStore, useViewUsersStore } from "../../../stores/useUserStore";
import EditUserDetails from "../../../components/MainPage/Users/EditUserDetails";

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
    const viewUsersStore = useViewUsersStore();
    const [messageApi, contextHolder] = message.useMessage()
    const [dataSource, setDataSource] = useState<DataSource[]>([]);
    const  { setUserId } = useEditRoleStore();
    const [ isSearching, setIsSearching ] = useState(false);
    const [ isUsersLoading, setIsUsersLoading ] = useState(false);
    const [ searchKeyword, setSearchKeyword ] = useState("");
    const editUserStore = useEditUserStore()


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

    const handleUserSearch = () => {
        setIsSearching(true)
        setIsUsersLoading(true)
        getAllUsers(page, limit, searchKeyword)
        .then(data => {
            viewUsersStore.setUsers(data.users)
            setTotal(data.total)
        })
        .finally(() => { 
            setIsSearching(false)
            setIsUsersLoading(false)
        })
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
                        <Button size="small" onClick={() => editUserStore.setUserId(record.key)}>Update</Button>
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
        setIsUsersLoading(true)
        getAllUsers(page, limit)
        .then(data => {
            viewUsersStore.setUsers(data.users)
            setTotal(data.total)
        })
        .finally(() => {
            setIsUsersLoading(false)
        })
        
    }, [page]);

    useEffect(() => {
        const d : any[]  = viewUsersStore.users.map((val, i) => {
            return  {
                key: val._id,
                name: val.name,
                email: val.email,
                isActive: val.isActive,
            }
        })
        setDataSource(d);
    }, [viewUsersStore.users])

    return (
        <>
            {contextHolder}

            <Title level={3} >User Accounts</Title>

            <div className="mb-2 max-w-96">
                <Search 
                addonBefore="Name" 
                placeholder="Search by name" 
                enterButton 
                loading={isSearching} 
                onChange={(e) => setSearchKeyword(e.target.value)} 
                onSearch={handleUserSearch}
                value={searchKeyword} />
            </div>

            <Table 
            loading={isUsersLoading}
            dataSource={dataSource} 
            columns={columns} 
            pagination={{
                current: page,
                pageSize: limit,
                total: total,
                onChange: (page) => setPage(page)
            }} />

            <EditUserRole />
            <EditUserDetails />
        </>
    )
}

export default Users;