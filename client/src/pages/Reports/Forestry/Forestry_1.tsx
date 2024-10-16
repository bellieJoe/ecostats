
import { Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Forestry_Table_1 from "../../../components/Reports/Forms/Forestry/Forestry_Table_1";


const Forestry_1 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Forestry_Table_1 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >Land Classification</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Forestry_1;
