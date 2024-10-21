
import { message, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import Land_Table_6 from "../../../components/Reports/Forms/Land/Land_Table_6";
import DataMigrator, { DataMigratorCol, DataMigratorColTypes } from "../../../components/DataMigrator";
import { FormEnum, Sector } from "../../../types/forms/formNameEnum";
import { formSaveMany } from "../../../services/api/formsApi";
import { parseResError } from "../../../services/errorHandler";


const Land_6 = () => {
    const [messageApi, contextHandler] = message.useMessage();
    
    const columns : DataMigratorCol[] = [
        { headerName: 'calendar_year', field: 'calendar_year', type: DataMigratorColTypes.number },
        { headerName: 'name_of_patentee', field: 'name_of_patentee', type: DataMigratorColTypes.string },
        { headerName: 'area_in_ha', field: 'area_in_ha', type: DataMigratorColTypes.number },
        { headerName: 'location.barangay', field: 'location.barangay', type: DataMigratorColTypes.string },
        { headerName: 'location.municipality', field: 'location.municipality', type: DataMigratorColTypes.string },
        { headerName: 'date_transmitted_to_rod', field: 'date_transmitted_to_rod', type: DataMigratorColTypes.date },
        { headerName: 'government_sites_housing_project_endorsement.school_site', field: 'government_sites_housing_project_endorsement.school_site', type: DataMigratorColTypes.boolean },
        { headerName: 'government_sites_housing_project_endorsement.lgu_government_site', field: 'government_sites_housing_project_endorsement.lgu_government_site', type: DataMigratorColTypes.boolean },
    ];

    const handleSave = (data) => {
        formSaveMany(data, FormEnum.LAND_6, Sector.LAND)
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
            children: <Land_Table_6 />,
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
            <Title level={4} >List of Special Patent of LGUs and NGAs</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </>
    )
}

export default Land_6;
