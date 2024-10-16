
import { Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Forestry_Table_24 from "../../../components/Reports/Forms/Forestry/Forestry_Table_24";


const Forestry_24 = () => {
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Forestry_Table_24 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: 'Migration',
        }
    ]
    return (
        <>
            <Title level={4} >Issued Chainsaw Registration</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Forestry_24;
