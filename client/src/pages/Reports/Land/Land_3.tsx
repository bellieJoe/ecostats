
import { message, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Land_Table_3 from "../../../components/Reports/Forms/Land/Land_Table_3";
import DataMigrator, { DataMigratorCol, DataMigratorColTypes } from "../../../components/DataMigrator";
import { formSaveMany } from "../../../services/api/formsApi";
import { FormEnum, Sector } from "../../../types/forms/formNameEnum";
import { parseResError } from "../../../services/errorHandler";


const Land_3 = () => {
    const [messageApi, contextHandler] = message.useMessage();
    
    const columns : DataMigratorCol[] = [
        { headerName: 'calendar_year', field: 'calendar_year', type: DataMigratorColTypes.number },
        { headerName: 'province', field: 'province', type: DataMigratorColTypes.string },
        { headerName: 'transmitted_to_RoD', field: 'transmitted_to_RoD', type: DataMigratorColTypes.number },
        { headerName: 'area', field: 'area', type: DataMigratorColTypes.number },
        { headerName: 'beneficiaries.total', field: 'beneficiaries.total', type: DataMigratorColTypes.number },
        { headerName: 'beneficiaries.male', field: 'beneficiaries.male', type: DataMigratorColTypes.number },
        { headerName: 'beneficiaries.female', field: 'beneficiaries.female', type: DataMigratorColTypes.number },
    ];

    const handleSave = (data) => {
        formSaveMany(data, FormEnum.LAND_3, Sector.LAND)
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
            children: <Land_Table_3 />,
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
            <Title level={4} >Residential Free Patent Issued</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_3;
