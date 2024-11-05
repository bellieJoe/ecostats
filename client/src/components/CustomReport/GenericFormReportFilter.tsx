import { Drawer, Form, Button, Divider, Typography, Checkbox, Row, Col, Input } from 'antd';
import { GenericFormFieldV3 } from '../../types/forms/GenericFormTypes';
import TextArea from 'antd/es/input/TextArea';

/**
 * CustomReportGenerator component.
 * Renders a Drawer with two sections:
 * 1. Filter Form: Allows users to input filter criteria. All fields are optional, and only filled fields will be submitted.
 * 2. Field Selection Form: Displays checkboxes for each field to determine if the field should be included in the result.
 *
 * @param {Object} props - The props for the component.
 * @param {boolean} props.visible - Whether the drawer is visible.
 * @param {Field[]} props.fields - The array containing field configurations.
 * @param {Function} props.onClose - The function to call when closing the drawer.
 * @param {Function} props.onSubmit - The async function to call when submitting the form.
 */
const CustomReportGenerator: React.FC<{
  visible: boolean;
  fields: GenericFormFieldV3[];
  onClose: () => void;
  onSubmit: (reportTitle: string, description : string, filters: Record<string, any>, fieldSelections: { name: string; included: boolean }[]) => Promise<void>;
  isCustom : boolean
  title : string
}> = ({ visible, fields, onClose, onSubmit, isCustom, title  }) => {
  
  const [form] = Form.useForm();
  const [selectionForm] = Form.useForm();

  // Custom validation function for field selections
  const validateSelection = (_, value) => {
    const atLeastOneChecked = Object.values(value).some((checked) => checked);
    if (!atLeastOneChecked) {
      return Promise.reject(new Error('At least one field must be selected.'));
    }
    return Promise.resolve();
  };

  // Handle form submission
  const handleFinish = async () => {
    try {
      if(isCustom)
        await selectionForm.validateFields(); // Validate the selection form before proceeding
      await form.validateFields(); // Ensure this is called for the report title validation

      const filterValues = form.getFieldsValue();
      const selectionValues = selectionForm.getFieldsValue();
      
      // Extract report title and description separately
      const reportTitle = isCustom && filterValues.reportTitle;
      const description = filterValues.reportDescription;
      

      // Filter out the fields that are empty in the filter form
      const filledFilterValues = Object.fromEntries(
        Object.entries(filterValues).filter(([key, value]) => key !== 'reportTitle' && key != 'reportDescription' && value !== undefined && value !== null && value !== '')
      );

      // Create the array of field selections based on the checkbox values
      const fieldSelections = isCustom
        ? fields.map(({ name }) => ({
            name,
            included: selectionValues[name] || false,
          }))
        : fields
            .filter(({ type }) => type !== 'title' && type !== 'divider')
            .map(({ name, notDefault }) => ({
              name,
              included: notDefault ? false : true,
            }));

      // Submit report title, description, filter values, and field selections
      await onSubmit(reportTitle, description, filledFilterValues, fieldSelections); 
      form.resetFields();
      selectionForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };


  return (
    <Drawer
      title={title}
      width={400}
      onClose={onClose}
      open={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleFinish} type="primary">
            Apply
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        {isCustom && (
          <Form.Item
            key="reportTitle"
            label="Report Title"
            name="reportTitle"
            rules={[{ required: true, message: 'Report title is required.' }]} // Make report title required
          >
            <Input placeholder="Enter report title" />
          </Form.Item>
        )}

        {isCustom && (
          <Form.Item
            key="reportDescription"
            label="Description"
            name="reportDescription"
          >
            <TextArea placeholder="Enter report description" />
          </Form.Item>
        )}


        <Typography.Title level={4}>Filter Data</Typography.Title>

        {fields.map(({ name, label, input, type }) => {
          const rules = []; // No required validation as all fields are optional

          if (type === 'input') {
            return (
              <Form.Item key={name} label={label} name={name} rules={!isCustom && name=='calendar_year' ? [{ required: true, message: 'Calendar year is required.' }] : rules}>
                {input}
              </Form.Item>
            );
          }
          if (type === 'checkbox') {
            return (
              <Form.Item key={name} label={label} name={name} valuePropName="checked" rules={rules}>
                <Checkbox>{input}</Checkbox>
              </Form.Item>
            );
          }
          if (type === 'title') {
            return (
              <Typography.Title level={5} key={name}>
                {label}
              </Typography.Title>
            );
          }
          if (type === 'divider') {
            return <Divider key={name} />;
          }
          return null; // Fallback case
        })}
      </Form>
      <Divider />

      {isCustom && (
        <Form form={selectionForm} layout="vertical">
          <Typography.Title level={4}>Select Fields to Display</Typography.Title>
          <Form.Item
            name="selection"
            rules={[{ validator: validateSelection }]} // Custom validation rule
          >
            <Row>
              {fields.filter(e => e.type != 'title' && e.type != 'divider').map(({ name, label }) => (
                <Col span={24} key={name}>
                  <Form.Item name={name} valuePropName="checked" noStyle>
                    <Checkbox>{label}</Checkbox>
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};

export default CustomReportGenerator;


