
import { Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Forestry_Table_5 from "../../../components/Reports/Forms/Forestry/Forestry_Table_5";


const Forestry_5 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Forestry_Table_5 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >Priority Critical Watershed Supporting National Irrigation System</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Forestry_5;
