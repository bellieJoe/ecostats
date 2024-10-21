
import { message, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Forestry_Table_3 from "../../../components/Reports/Forms/Forestry/Forestry_Table_3";
import DataMigrator, { DataMigratorCol, DataMigratorColTypes } from "../../../components/DataMigrator";
import { formSaveMany } from "../../../services/api/formsApi";
import { FormEnum, Sector } from "../../../types/forms/formNameEnum";
import { parseResError } from "../../../services/errorHandler";


const Forestry_3 = () => {

    const [messageApi, contextHandler] = message.useMessage();
    
    const columns : DataMigratorCol[] = [
        { headerName: 'calendar_year', field: 'calendar_year', type: DataMigratorColTypes.number },
        { headerName: 'province', field: 'province', type: DataMigratorColTypes.string },
        { headerName: 'total_area', field: 'total_area', type: DataMigratorColTypes.number },
        { headerName: 'production_forest', field: 'production_forest', type: DataMigratorColTypes.number },
        { headerName: 'protection_forest', field: 'protection_forest', type: DataMigratorColTypes.number },
       
        
    ]

    const handleSave = (data) => {
        formSaveMany(data, FormEnum.FORESTRY_3, Sector.FORESTRY)
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
            children: <Forestry_Table_3 />,
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
            <Title level={4} >Production and Protection Forest (Hectares)</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Forestry_3;
