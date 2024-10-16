
import { Tabs, TabsProps } from "antd";
import Land_Table_1 from "../../../components/Reports/Forms/Land/Land_Table_1";
import Land_Table_2 from "../../../components/Reports/Forms/Land/Land_Table_2";
import Title from "antd/es/typography/Title";


const Land_2 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Land_Table_2 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >Patrimonial Properties as of CY 2023</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_2;
