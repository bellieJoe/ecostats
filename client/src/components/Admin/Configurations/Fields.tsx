import { Button, Collapse, Drawer, Flex, Form, Space, Typography } from "antd"
import { useReportFieldsStore, useUpdateFieldsStore, useUpdateReportConfigStore } from "../../../stores/useReportConfigStore"
import UpdateField from "./UpdateField";
import { useEffect, useState } from "react";

const Text = Typography.Text;

const RecursiveFields = ({ fields } : { fields : any[] }) => {

    const { setStore, field } = useUpdateFieldsStore();
    const { reportData } = useReportFieldsStore();
    

    return (
        <>
            {
                fields && fields.length > 0 &&
                fields.map((field, index) => (
                    <Collapse className="my-2"  key={index}>
                        <Collapse.Panel header={(
                            <Flex justify="space-between">
                                <Text>{field.name}</Text>
                            </Flex>
                            )}  
                            key={field.identifier}
                        >
                            <div key={index}>
                                <Flex justify="end" gap={4}>
                                    <Button size="small" color="danger" variant="outlined">Delete</Button>
                                    <Button size="small" onClick={() => {
                                        setStore(reportData._id, field);
                                    }}>Edit</Button>
                                </Flex  >
                                <div><Text strong>Field Name : </Text><Text>{field.name}</Text></div>
                                <div><Text strong>Identifier : </Text><Text code>{field.identifier}</Text></div>
                                {
                                    field.is_nested ? (
                                        <div>
                                            <RecursiveFields fields={field.children} />
                                        </div>
                                    ) : (
                                        <div>
                                            <div><Text strong>Input Type : </Text><Text code>{field.input_type}</Text></div>
                                            <div><Text strong>Editable : </Text><Text code>{field.editable ? "True" : "False"}</Text></div>
                                            {
                                                !field.editable && (<div><Text strong>Default : </Text><Text>{field.default}</Text></div>)
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                ))
            }
        </>
    )
}

const FieldsDrawer = ({onClose}) => {

    const store = useReportFieldsStore();

    const [form] = Form.useForm();

    return (
        <Drawer 
            title={`Report Fields`}
            width="100%"
            onClose={() => {
                store.setReportData({});
                onClose();
            }}
            open={Object.keys(store.reportData).length > 0}
        >
            <RecursiveFields fields={store.reportData.fields} />

            <UpdateField />
        </Drawer>
    )
}

export default FieldsDrawer;