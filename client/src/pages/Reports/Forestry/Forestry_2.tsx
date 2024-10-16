
import { Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Forestry_Table_2 from "../../../components/Reports/Forms/Forestry/Forestry_Table_2";


const Forestry_2 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Forestry_Table_2 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >Land Cover</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Forestry_2;
