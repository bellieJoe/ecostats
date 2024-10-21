
import { message, Tabs, TabsProps } from "antd";
import Land_Table_1 from "../../../../components/Reports/Forms/Land/Land_Table_1";
import Land_Table_2 from "../../../../components/Reports/Forms/Land/Land_Table_2";
import Title from "antd/es/typography/Title";
import DataMigrator, { DataMigratorCol, DataMigratorColTypes } from "../../../../components/DataMigrator";
import { FormEnum, Sector } from "../../../../types/forms/formNameEnum";
import { formSaveMany } from "../../../../services/api/formsApi";
import { parseResError } from "../../../../services/errorHandler";
import { useErrorLogStore } from "../../../../stores/useErrorLogStore";


const Land_2 = () => {

    const errorLogStore = useErrorLogStore();

    const [messageApi, contextHandler] = message.useMessage();

    const columns : DataMigratorCol[] = [
        { headerName: 'calendar_year', field: 'calendar_year', type: DataMigratorColTypes.number },
        { headerName: 'province', field: 'province', type: DataMigratorColTypes.string },
        { headerName: 'municipality', field: 'municipality', type: DataMigratorColTypes.string },
        { headerName: 'no_of_lots', field: 'no_of_lots', type: DataMigratorColTypes.number },
        { headerName: 'total_land_area', field: 'total_land_area', type: DataMigratorColTypes.number },
        { headerName: 'sale', field: 'sale', type: DataMigratorColTypes.number },
        { headerName: 'lease', field: 'lease', type: DataMigratorColTypes.number },
    ];

    const handleSave = (data) => {
        formSaveMany(data, FormEnum.LAND_2, Sector.LAND)
        .then(res => {
            messageApi.success("Data successfully updated.");
        })
        .catch(err => {
            if(err.response.status == 422){
                errorLogStore.setError(err.response.data)
            }
            messageApi.error(parseResError(err).msg);
            console.log(err)
        })
        .finally();
    };
    
    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <Land_Table_2 />,
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
            <Title level={4} >Patrimonial Properties as of CY 2023</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_2;
