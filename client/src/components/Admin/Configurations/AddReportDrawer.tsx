
import { Button, Checkbox, Collapse, Drawer, Flex, Form, FormInstance, Input, Select, Space, Typography } from "antd";
import { useAddReportConfigStore } from "../../../stores/useReportConfigStore";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";


const RecursiveField = ({ fieldPath, form } : { fieldPath: any, form: FormInstance }) => {
    return (
      <Form.List name={fieldPath} initialValue={[]}  >
        {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => {
                    return (
                      <Collapse key={field.key} className="mb-2 hover:bg-slate-100 hover:border-slate-300">
                        <Collapse.Panel header={`Field ${index + 1}`} key={field.key} extra={(
                                <Button
                                    variant="dashed"
                                    color="danger"
                                    onClick={() => remove(field.name)}
                                    icon={<MinusCircleOutlined />}
                                >
                                    Remove Field
                                </Button>
                            )}>
                          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            {/* Basic Field Information */}
                            <Form.Item
                              label="Field Name"
                              name={[field.name, 'name']}
                              rules={[{ required: true, message: 'Please enter a field name' }]}
                            >
                              <Input placeholder="Field name" />
                            </Form.Item>
          
                            <Form.Item
                              label="Identifier"
                              name={[field.name, 'identifier']}
                              rules={[{ required: true, message: 'Please enter an identifier' }]}
                            >
                              <Input placeholder="Unique field identifier" />
                            </Form.Item>

                            <Form.Item
                              name={[field.name, 'isNested']}
                              valuePropName="checked"
                              initialValue={false}
                            >
                              <Checkbox>Is Nested</Checkbox>
                            </Form.Item>
                            
                            {
                                !form.getFieldValue(["fields", field.name, "isNested"]) && (
                                    <>
                                        <Form.Item
                                        label="Input Type"
                                        name={[field.name, 'inputType']}
                                        rules={[{ required: true, message: 'Please select an input type' }]}
                                        >
                                            <Select placeholder="Select input type">
                                                <Select.Option value="text">Text</Select.Option>
                                                <Select.Option value="number">Number</Select.Option>
                                                <Select.Option value="date">Date</Select.Option>
                                                <Select.Option value="enum">Enum</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        {
                                            form.getFieldValue(["fields", field.name, "inputType"]) === "enum" 
                                            && (
                                            <Form.Item name={[field.name, "values"]} label="Values" rules={[{ required: true, message: 'Please add at least one value for the enum.' }]}>
                                                <Form.List  name={[field.name, "values"]} >
                                                    {(fields, { add: addValue, remove: removeValue }) => (
                                                    <Flex gap={10}>
                                                        {fields.map((field, index) => (
                                                        <Flex gap={5} key={field.key} align="baseline">
                                                            <Form.Item
                                                            {...field}
                                                            name={[field.name, 'value']}
                                                            rules={[{ required: true, message: 'Missing value' }]}
                                                            >
                                                            <Input placeholder="Value" />
                                                            </Form.Item>
                                                            <MinusCircleOutlined
                                                            onClick={() => removeValue(field.name)}
                                                            />
                                                        </Flex>
                                                        ))}
                                                        <Form.Item>
                                                        <Button type="dashed" onClick={() => addValue()} block icon={<PlusOutlined />}>
                                                            Add value
                                                        </Button>
                                                        </Form.Item>
                                                    </Flex>
                                                    )}
                                                </Form.List>
                                            </Form.Item>
                                            )
                                        }       
                                    </>
                                )
                            }
          
                            {/* Recursive Children Fields */}
                            {
                                form.getFieldValue(["fields", field.name, "isNested"]) && <RecursiveField fieldPath={[field.name, 'children']} form={form} />
                            }
        
                          </Space>
                        </Collapse.Panel>
                      </Collapse>
                    )
                })
                }
      
                {/* Add Field Button */}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Field
                  </Button>
                </Form.Item>
              </div>
            )}
        }
      </Form.List>
    );
  };


const AddReportDrawer = () => {
    const AddReportConfigStore = useAddReportConfigStore();
    const [form] = Form.useForm();

    const handleFinish = () => {
        console.log(form.getFieldsValue());
    }

    useEffect(() => {
        if (AddReportConfigStore.sector) {
            form.setFieldsValue({ sectorName: AddReportConfigStore.sector.name, sector: AddReportConfigStore.sector._id });
        }
    }, [AddReportConfigStore.sector]);
    
    return (
        <Drawer 
            width="100%"
            open={!!AddReportConfigStore.sector}
            onClose={() => {
                    form.resetFields();
                    AddReportConfigStore.setSector(null)
                }
            }>
            <Form 
            onValuesChange={(values) => {
                // console.log(values)
            }}
                form={form}
                onFinish={handleFinish}>
                <Flex gap={10} justify="">
                    <Form.Item
                        label="Sector"
                        name="sector"
                        hidden
                        initialValue={AddReportConfigStore.sector?._id!}
                        rules={[{ required: true, message: 'Please enter a report identifier' }]}
                    >
                        <Input hidden  />
                    </Form.Item>
                    <Form.Item
                        label="Sector"
                        name="sectorName"
                        initialValue={AddReportConfigStore.sector?.name!}
                        rules={[{ required: true, message: 'Please enter a report identifier' }]}
                    >
                        <Input readOnly  />
                    </Form.Item>
                    <Form.Item
                        label="Identifier"
                        name="identifier"
                        rules={[{ required: true, message: 'Please enter a report identifier' }]}
                        
                    >
                        <Input placeholder="Unique report identifier" />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter a report name' }]}
                    >
                        <Input placeholder="Report name" />
                    </Form.Item>
                </Flex>

                {/* Recursive Fields */}
                <Form.Item
                label="Fields"
                name="fields"
                rules={[{ required: true, message: 'Please add at least one field.' }]}
                >
                    <RecursiveField fieldPath="fields" form={form} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )   
}

export default AddReportDrawer;