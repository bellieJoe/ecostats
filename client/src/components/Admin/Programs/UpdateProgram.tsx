import { Button, Drawer, Flex, Form, Input, message } from "antd";
import { useUpdateProgramStore } from "../../../stores/useProgramStore";
import { useEffect, useState } from "react";
import { getProgramById, updateProgram } from "../../../services/api/programApi";
import { parseResError } from "../../../services/errorHandler";
import Title from "antd/es/typography/Title";
import { Program } from "../../../types/Program";

interface Props {
    onUpdated? : (program : Program) => any
}

const UpdateProgram = ({onUpdated} : Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const store = useUpdateProgramStore();

    const submitForm = (e) => {
        setIsSaving(true)
        updateProgram(e.id, e.name)
        .then(res => {
            store.clear();
            messageApi.success("Program updated successfully");
            if(onUpdated){
                onUpdated(res.data)
            }
        })
        .catch(err => {
            if(err.response.status == 422){
                store.errors = err.response.data.errors;
            }
            else {
                messageApi.error(parseResError(err).msg);
            }
        })
        .finally(() => setIsSaving(false))
    }
    
    useEffect(() => {
        if(store.programId){
            setLoading(true)
            getProgramById(store.programId)
            .then(res => {
                store.setProgram(res.data);
                
            })
            .catch(err => {
                messageApi.error(parseResError(err).msg);
            })
            .finally(() => setLoading(false))
        }
    }, [store.programId])

    return (
        <>
            { contextHolder }
            <Drawer 
            onClose={() => store.clear()}
            loading={loading}
            
            open={!!store.programId}>
                <Title level={5} >Update Program</Title>
                
                <Form   
                onFinish={submitForm}
                layout="vertical"
                initialValues={store.formData}>
                    <Form.Item 
                    rules={[{required: true}]}
                    name="id"
                    hidden
                    >
                        <Input placeholder="Program Name"   />
                    </Form.Item>

                    <Form.Item 
                    label="Program Name" 
                    rules={[{required: true}]}
                    name="name"
                    
                    >
                        <Input placeholder="Program Name"    />
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="end">
                            <Button htmlType="submit" variant="solid" color="primary" loading={isSaving}> Save</Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default UpdateProgram;