import { useEffect, useState } from "react";
import { useAddChartStore } from "../../stores/useReportStore"
import { Button, Card, Checkbox, Col, Drawer, Flex, Form, FormInstance, Input, message, Row, Select, Space } from "antd";
import { flattenFields } from "../../services/helper";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { parseResError } from "../../services/errorHandler";
import { chartConfigCreate } from "../../services/api/chartConfigApi";

const ChartConfig = ({chartType, config, form} : {chartType : string, config : any, form : FormInstance}) => {

    const [fields, setFields] = useState<any[]>([]);

    const uniqueValuesValidator = async (_, values) => {
        const uniqueValues = new Set(values);
        if (uniqueValues.size !== values.length) {
            return Promise.reject(new Error('Values must be unique.'));
        }
        return Promise.resolve();
    }

    useEffect(() => {
        if(Object.keys(config).length > 0 && config.fields.length > 0){
            console.log(config)
            console.log(flattenFields(config.fields))
            setFields(flattenFields(config.fields));
        }
    }, [config]);

    if(chartType == "Horizontal Bar Chart"){
        return (
            <>
                <Form.Item 
                    name={["chart_config", "stacked"]}
                    valuePropName="checked"
                    rules={[{required: true, message: "Specifiy if the bars are stacked"}]}
                    initialValue={false}
                    >
                    <Checkbox >Stacked</Checkbox>
                </Form.Item>

                <Form.Item 
                    label="Y Axis" 
                    name={["chart_config", "y_axis"]} 
                    rules={[{ required: true , message: "Y Axis is required"}]}>
                    <Select
                        className="w-full" 
                        placeholder="Select field for Y Axis" 
                        options={fields.filter(f => f.input_type && ["text", "enum"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))} />
                </Form.Item>

                <Form.List 
                    name={["chart_config", "x_axis"]} 
                >
                    {(_fields, { add, remove }) => (
                    <>
                        {_fields.map((field, index) => (
                            <Flex className="w-full" justify="space-between">
                                <Form.Item
                                    {...field}
                                    label="X Axis"
                                    className="w-full"
                                    rules={[
                                        { required: true , message: "X Axis is required"},
                                        {
                                            validator : async (_, value) => {
                                                const values = (await form.getFieldValue(["chart_config", "x_axis"])) || [];
                                                return uniqueValuesValidator(_, values);
                                            }
                                        }
                                    ]}
                                    key={field.key}
                                    name={field.name}
                                >
                                    <Select
                                        placeholder="Select field for X Axis"
                                        options={fields.filter(f => f.input_type && ["number"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))}
                                    />
    
    
                                </Form.Item>
                                {_fields.length > 1 ? (
                                    <Button size="small" variant="text" color="danger" onClick={() => remove(field.name)}>Remove</Button>
                                ) : null}
                            </Flex>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                            >
                                <PlusOutlined /> Add X axis
                            </Button>
                        </Form.Item>
                    </>
                    )}
                </Form.List>
                
            </>
        )
    }
    if(chartType == "Vertical Bar Chart"){
        return (
            <>
                <Form.Item 
                    name={["chart_config", "stacked"]}
                    valuePropName="checked"
                    rules={[{required: true, message: "Specifiy if the bars are stacked"}]}
                    initialValue={false}
                    >
                    <Checkbox >Stacked</Checkbox>
                </Form.Item>

                <Form.Item 
                    label="X Axis" 
                    name={["chart_config", "x_axis"]} 
                    rules={[{ required: true , message: "X Axis is required"}]}>
                    <Select
                        className="w-full" 
                        placeholder="Select field for X Axis" 
                        options={fields.filter(f => f.input_type && ["text", "enum"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))} />
                </Form.Item>

                <Form.List 
                    name={["chart_config", "y_axis"]} 
                >
                    {(_fields, { add, remove }) => (
                    <>
                        {_fields.map((field, index) => (
                            <Flex className="w-full" justify="space-between">
                                <Form.Item
                                    {...field}
                                    label="Y Axis"
                                    className="w-full"
                                    rules={[
                                        { required: true , message: "Y Axis is required"},
                                        {
                                            validator : async (_, value) => {
                                                const values = (await form.getFieldValue(["chart_config", "Y_axis"])) || [];
                                                return uniqueValuesValidator(_, values);
                                            }
                                        }
                                    ]}
                                    key={field.key}
                                    name={field.name}
                                >
                                    <Select
                                        placeholder="Select field for Y Axis"
                                        options={fields.filter(f => f.input_type && ["number"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))}
                                    />
    
    
                                </Form.Item>
                                {_fields.length > 1 ? (
                                    <Button size="small" variant="text" color="danger" onClick={() => remove(field.name)}>Remove</Button>
                                ) : null}
                            </Flex>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                            >
                                <PlusOutlined /> Add Y axis
                            </Button>
                        </Form.Item>
                    </>
                    )}
                </Form.List>

                <Form.Item
                    // label="Include Other Years?"
                    name={["chart_config", "include_other_years"]}
                    rules={[{ required: true , message: "Color is required"}]}
                    initialValue={false}
                    valuePropName="checked">
                    <Checkbox  >Include Other Years?</Checkbox>
                </Form.Item>
                
            </>
        )
    }
    if(chartType == "Pie Chart"){
        return (
            <>
                <Form.Item
                    label="Category"
                    name={["chart_config", "category"]}
                    rules={[{ required: true , message: "Category is required"}]}>
                    <Select
                        className="w-full" 
                        placeholder="Select field for category" 
                        options={fields.filter(f => f.input_type && ["text", "enum"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))} />
                </Form.Item>
                <Form.Item
                    label="Value"
                    name={["chart_config", "value"]}
                    rules={[{ required: true , message: "Value is required"}]}>
                    <Select
                        className="w-full" 
                        placeholder="Select field for value" 
                        options={fields.filter(f => f.input_type && ["number"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))} />
                </Form.Item>
            </>
        )
    }
    if(chartType == "Line Chart"){
        return (
            <>
                <Form.Item
                    label="Category"
                    name={["chart_config", "category"]}
                    rules={[{ required: true , message: "Category is required"}]}>
                    <Select
                        className="w-full" 
                        placeholder="Select field for category" 
                        options={fields.filter(f => f.input_type && ["text", "enum"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))} />
                </Form.Item>
                <Form.List 
                    name={["chart_config", "lines"]} 
                >
                    {(_fields, { add, remove }) => (
                    <>
                        {_fields.map((field, index) => (
                            <Flex className="w-full" justify="space-between">
                                <Form.Item
                                    {...field}
                                    label="Line"
                                    className="w-full"
                                    rules={[
                                        { required: true , message: "Line is required"},
                                        {
                                            validator : async (_, value) => {
                                                const values = (await form.getFieldValue(["chart_config", "lines"])) || [];
                                                return uniqueValuesValidator(_, values);
                                            }
                                        }
                                    ]}
                                    key={field.key}
                                    name={field.name}
                                >
                                    <Select
                                        placeholder="Select field for Line"
                                        options={fields.filter(f => f.input_type && ["number"].includes(f.input_type)).map(f => ({label : f.identifier, value : f.identifier}))}
                                    />
                                </Form.Item>
                                {_fields.length > 1 ? (
                                    <Button size="small" variant="text" color="danger" onClick={() => remove(field.name)}>Remove</Button>
                                ) : null}
                            </Flex>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                            >
                                <PlusOutlined /> Add Y axis
                            </Button>
                        </Form.Item>
                    </>
                    )}
                </Form.List>
            </>
        )
    }
    if(chartType == "Tabular Presentation"){
        return (
            <>
                <p className="mb-4 font-semibold">Select Fields</p>
                <Form.Item>
                    <Row>
                        {Object.keys(fields).map((field) => (
                            <Col>
                                <Form.Item
                                    key={field}
                                    name={["chart_config","fields", fields[field].identifier]}
                                    valuePropName="checked"
                                    initialValue={false}>
                                    <Checkbox>{fields[field].name}</Checkbox>
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>
                </Form.Item>
            </>
        )
    }
    return (<></>)
}

const AddChart = ({onSave}) => {

    const { config, setConfig } = useAddChartStore();
    const [form] = Form.useForm();
    const [chartType, setChartType] = useState<string>("Horizontal Bar Chart");
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => { 
        
    }, [config]);

    const handleSave = async () => {
        setIsSaving(true);
        await form.validateFields();
        try {
            const data = form.getFieldsValue();
            await chartConfigCreate(data);
            onSave();
            message.success("Chart successfully added.");
        } catch (error) {
            message.error(parseResError(error).msg);
        } finally {
            setIsSaving(false);
        }
    }
    

    return (
        <Drawer 
            open={Object.keys(config).length > 0} 
            title="Add Chart" 
            onClose={() => {
                setConfig({})
                form.resetFields();
            }}>
            <Form form={form} onFinish={handleSave}>
                <Form.Item label="Report" name="report_name" initialValue={config.name}>
                    <Input type="text" readOnly />
                </Form.Item>

                <Form.Item 
                    hidden 
                    label="Report" 
                    name="report_config_id" 
                    initialValue={config._id} >
                    <Input type="text" readOnly />
                </Form.Item>

                <Form.Item 
                    label="Title" 
                    name="title"
                    rules={[{ required: true , message: "Title is required"}]}>
                    <Input type="text" />
                </Form.Item>

                <Form.Item 
                    label="Chart Type" 
                    name="type" 
                    initialValue={chartType}
                    preserve={false}
                    rules={[{ required: true , message: "Chart Type is required"}]}>
                    <Select placeholder="Select Chart Type" onChange={(e) => setChartType(e)} options={[
                        { 
                            label: "Vertical Bar Chart", 
                            value: "Vertical Bar Chart" 
                        }, 
                        { 
                            label: "Horizontal Bar Chart", 
                            value: "Horizontal Bar Chart" 
                        }, 
                        { 
                            label: "Pie Chart", 
                            value: "Pie Chart" 
                        }, 
                        { 
                            label: "Line Chart", 
                            value: "Line Chart" 
                        },
                        { 
                            label: "Tabular Presentation", 
                            value: "Tabular Presentation" 
                        }
                    ]} />
                </Form.Item>


                <Card title="Chart Config" className="mb-4">
                    <ChartConfig chartType={chartType} config={config} form={form} />
                </Card>

                <Form.Item >
                    <Button loading={isSaving} className="block ms-auto me-0" htmlType="submit" color="primary" variant="solid">Save</Button>
                </Form.Item>


            </Form>
        </Drawer>
    )
}

export default AddChart;

