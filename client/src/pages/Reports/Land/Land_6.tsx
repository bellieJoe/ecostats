
import { Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Land_Table_6 from "../../../components/Reports/Forms/Land/Land_Table_6";


const Land_6 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Land_Table_6 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >List of Special Patent of LGUs and NGAs</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_6;
