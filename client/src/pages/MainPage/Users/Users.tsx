import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/api/userApi";
import { Layout, Table } from "antd";
import { User } from "../../../types/User";
import { Header } from "antd/es/layout/layout";

interface DataSource {
    key: string
    name: string
    email: string
    isActive: string
}

const Users = () => {
    const [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(10);
    const [ total, setTotal ] = useState(0);
    const [ users, setUsers ] = useState<User[]>([]);

    const [dataSource, setDataSource] = useState<DataSource[]>([]);

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
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
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
                isActive: val.isActive ? "Active" : "Inactive",
            }
        })
        setDataSource(d);
    }, [users])

    return (
        <>
            <h2>User Accounts</h2>
            <Table 
            dataSource={dataSource} 
            columns={columns} 
            pagination={{
                current: page,
                pageSize: limit,
                total: total,
                onChange: (page) => setPage(page)
            }} />
        </>
    )
}

export default Users;