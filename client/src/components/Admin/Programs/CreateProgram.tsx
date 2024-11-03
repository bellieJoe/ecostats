import { Button, Card, Input, message, Select, SelectProps } from "antd";
import Title from "antd/es/typography/Title";
import { useCallback, useEffect, useState } from "react";
import { getByQuery, searchUserByName } from "../../../services/api/userApi";
import debounce from 'lodash.debounce';
import { createProgram } from "../../../services/api/programApi";
import { ValidationError } from "../../../types/ApiValidationError";
import FieldError from "../../FieldError";
import { Sector } from "../../../types/forms/formNameEnum";



const CreateProgram = () => {
    const [userOptions, setUserOptions] = useState([]);
    const [selectUserloading, setSelectUserloading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState<{name:string, userId:string|null, management : string}>({
        userId: null,
        name : "",
        management : ""
    });
    const [validationErrors , setValidationErrors] = useState<ValidationError[]>([]);
    

    const debouncedSearch = useCallback(
        debounce((value) => {
            setSelectUserloading(true)
            getByQuery({
                name : {
                    $regex : value,
                    $options : "i"
                },
                role : "chief"
            })
            .then(res => {
                console.log(res.data)
                const options = res.data.map(val => {
                    return {
                        value : val._id,
                        label : val.name,
                        email : val.email
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
        console.log({...formData})
        createProgram(formData.userId!, formData.name, formData.management)
        .then(res => {
            setFormData({userId: null, name : "", management : ""})
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


    const optionRenderer = (option) => {
        return (
            <>
                <p>{option.label}</p>
                <p className="opacity-80">{option.data.email}</p>
            </>
        )
    }

    return (
        <>
            {contextHolder}
            <Card >
                <Title level={4}>Register Division</Title>
                <div className="mb-2">
                    <Title level={5}>Division Name</Title>
                    <Input placeholder="Enter Division Name" onChange={(e)=>setFormData({...formData, name:e.target.value})} value={formData.name} />
                    <FieldError errors={validationErrors} name={"name"} />
                </div>

                <div className="mb-2">
                    <Title level={5}>Assign Management</Title>
                    {/* <Input placeholder="Assign" onChange={(e)=>setFormData({...formData, name:e.target.value})} value={formData.name} /> */}
                    <Select 
                        className="w-full" 
                        placeholder="Assign Management"
                        value={formData.management}
                        onChange={(e)=>setFormData({...formData, management: e})}
                        options={[
                            { value: Sector.LAND, label: "Land" },
                            { value: Sector.FORESTRY, label: "Forestry" },
                            { value: Sector.BIODIVERSITY, label: "Biodiversity" },
                        ]} />
                    <FieldError errors={validationErrors} name={"management"} />
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
                    onClear={()=>{
                        setUserOptions([])
                        setFormData({...formData, userId:null})
                    }}  
                    options={userOptions.map(opt => opt)} 
                    optionRender={(option) => optionRenderer(option)}/>
                    <FieldError errors={validationErrors} name={"userId"} />
                </div>

                <br />
                <Button className="w-full" type="primary" onClick={onSave} loading={isSaving}>Register Division</Button>
            </Card>
        </>
    )
}

export default CreateProgram;