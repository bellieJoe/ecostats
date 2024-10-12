import { Button, Card, Input, message, Select, SelectProps } from "antd";
import Title from "antd/es/typography/Title";
import { useCallback, useState } from "react";
import { searchUserByName } from "../../services/api/userApi";
import debounce from 'lodash.debounce';
import { createProgram } from "../../services/api/programApi";
import { ValidationError } from "../../types/ApiValidationError";
import FieldError from "../FieldError";



const CreateProgram = () => {
    const [userOptions, setUserOptions] = useState([]);
    const [selectUserloading, setSelectUserloading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState<{name:string, userId:string|null}>({
        userId: null,
        name : ""
    });
    const [validationErrors , setValidationErrors] = useState<ValidationError[]>([]);
    

    const debouncedSearch = useCallback(
        debounce((value) => {
            setSelectUserloading(true)
            searchUserByName(value)
            .then(res => {
                const options = res.data.map(val => {
                    return {
                        value : val._id,
                        label : `${val.name} (${val.email})`
                    }
                });
                setUserOptions(options)
            })
            .catch(err => {
                messageApi.error("Unexpected Error occured")
            })
            .finally(()=>{
                setSelectUserloading(false)
            })
        }, 500),[]);

    const searchUser = (e) => {
        debouncedSearch(e)
    }

    const onSave = () => {
        setIsSaving(true)
        setValidationErrors([])
        createProgram(formData.userId!, formData.name)
        .then(res => {
            setFormData({userId: null, name : ""})
            messageApi.success("Program successfully created.")
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 422){
                setValidationErrors(err.response.data.errors)
            }
            else{
                messageApi.error(err.response.data.msg)
            }
        })
        .finally(() => setIsSaving(false))
    }

    return (
        <>
            {contextHolder}
            <Card >
                <Title level={4}>Register Program/Division</Title>
                <div className="mb-2">
                    <Title level={5}>Program/Division Name</Title>
                    <Input placeholder="Enter Division Name" onChange={(e)=>setFormData({...formData, name:e.target.value})} value={formData.name} />
                    <FieldError errors={validationErrors} name={"name"} />
                </div>

                <div className="mb-2">
                    <Title level={5}>Assign Division Head</Title>
                    <Select 
                    showSearch
                    allowClear
                    value={formData.userId}
                    onSelect={(e)=>setFormData({...formData, userId:e})}
                    loading={selectUserloading}
                    className="w-full" 
                    placeholder="Search User Account"
                    filterOption={false}
                    onSearch={searchUser} 
                    onClear={()=>setUserOptions([])}  
                    options={userOptions.map(opt => opt)} />
                    <FieldError errors={validationErrors} name={"userId"} />
                </div>

                <Button className="w-full" type="primary" onClick={onSave} loading={isSaving}>Register Division</Button>
            </Card>
        </>
    )
}

export default CreateProgram;