
import { Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Land_Table_4 from "../../../../components/Forms/Tables/Land_Table_4";


const Land_4 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Land_Table_4 />,
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
            <Title level={4} >Agricultural Free Patent Issued</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_4;
