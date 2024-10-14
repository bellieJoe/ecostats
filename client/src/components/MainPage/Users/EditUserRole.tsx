import { Drawer, message, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useEditRoleStore } from "../../../stores/useRoleStore";
import Title from "antd/es/typography/Title";
import { getRolesByUserId } from "../../../services/api/roleApi";


const EditUserRole = () => {
    const [open, setOpen] = useState(false)
    const {userId, setUserId, clear, setRoles, roles} = useEditRoleStore()
    const [messageApi, contextHolder] = message.useMessage()

    const fetchUsersRoles = () => {
        getRolesByUserId(userId!)
        .then(res => {
            setRoles(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if(userId){
            setOpen(true)
            fetchUsersRoles()
        }
        else{
            setOpen(false)
        }
    }, [userId])
    return (
        <>
            {contextHolder}
            <Drawer 
                placement="right" 
                open={open}
                onClose={() => clear()}
                >
                <Title level={4}>User Roles</Title>
                <Space>
                    {
                        roles.map(role => {
                            return (
                                <Tag key={role._id} closeIcon onClose={() => console.log("Close")}>
                                    {role.name}
                                </Tag>
                            )
                        })
                    }
                </Space>
                {userId}
            </Drawer>
        </>
    )
}

export default EditUserRole;