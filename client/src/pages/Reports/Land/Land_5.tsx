
import { Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Land_Table_5 from "../../../components/Reports/Forms/Land/Land_Table_5";


const Land_5 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Land_Table_5 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >Homestead</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_5;
