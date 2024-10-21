
import { message, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Forestry_Table_24 from "../../../components/Reports/Forms/Forestry/Forestry_Table_24";
import DataMigrator, { DataMigratorCol, DataMigratorColTypes } from "../../../components/DataMigrator";
import { formSaveMany } from "../../../services/api/formsApi";
import { FormEnum, Sector } from "../../../types/forms/formNameEnum";
import { parseResError } from "../../../services/errorHandler";


const Forestry_24 = () => {

    const [messageApi, contextHandler] = message.useMessage();
    
    const columns : DataMigratorCol[] = [
        { headerName: 'calendar_year', field: 'calendar_year', type: DataMigratorColTypes.number },
        { headerName: 'province', field: 'province', type: DataMigratorColTypes.string },
        { headerName: 'municipality', field: 'municipality', type: DataMigratorColTypes.string },
        { headerName: 'number_of_chainsaw_registered', field: 'number_of_chainsaw_registered', type: DataMigratorColTypes.number },
        { headerName: 'area_of_operation', field: 'area_of_operation', type: DataMigratorColTypes.string },
        { headerName: 'number_of_chainsaw_operator', field: 'number_of_chainsaw_operator', type: DataMigratorColTypes.number },
    ];

    const handleSave = (data) => {
        formSaveMany(data, FormEnum.FORESTRY_24, Sector.FORESTRY)
        .then(res => {
            messageApi.success("Data successfully updated.");
        })
        .catch(err => {
            messageApi.error(parseResError(err).msg);
            console.log(err)
        })
        .finally();
    };
    
    
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Forestry_Table_24 />,
        },
        {
            key: '3',
            label: 'Migration',
            children: <DataMigrator columns={columns} onSave={handleSave} />,
        }
    ]
    return (
        <>
            { contextHandler }
            <Title level={4} >Issued Chainsaw Registration</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Forestry_24;
