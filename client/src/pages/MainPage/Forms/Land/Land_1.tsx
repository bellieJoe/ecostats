
import { Tabs, TabsProps } from "antd";
import Land_Table_1 from "../../../../components/Forms/Tables/Land_Table_1";
import Title from "antd/es/typography/Title";


const Land_1 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Land_Table_1 />,
        },
        {
            key: '2',
            label: 'Reports',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >Land Area</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_1;
