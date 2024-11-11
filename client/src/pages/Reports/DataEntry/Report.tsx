import { message, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { parseResError } from "../../../services/errorHandler";
import { reportConfigGetByQuery } from "../../../services/api/reportConfigApi";
import DataEntry from "../../../components/Reports/DataEntry";
import DataMigratorV2 from "../../../components/Reports/DataMigratorV2";


const Report = () => {
    const {_id} = useParams();
    const [reportConfig, setReportConfig] = useState<any>({});

    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Form',
            children: <DataEntry config={reportConfig} />,
        },
        {
            key: '2',
            label: 'Migration',
            children: <DataMigratorV2 onSave={() => {}} config={reportConfig}  />,
        },
        {
            key: '3',
            label: 'Reports',
            // children: <CustomReport 
            //             formName={FormEnum.LAND_1} 
            //             sector={Sector.LAND} 
            //             fields={land_1_gen_form_fields}
            //             colDefs={land_1_col_defs} />
        }
    ];

    const fetchReportConfig = async () => {
        try {
            const config = (await reportConfigGetByQuery({_id : _id}, ["sector"])).data[0];
            setReportConfig(config);
            // console.log("config",config)
        } catch (error) {
            message.error(parseResError(error).msg);
        }
    }
    useEffect(() => {
        setReportConfig({});
        fetchReportConfig();
    }, [_id]);

    


    return (
        <div>
            <Title level={4}>{reportConfig.name}</Title>
            <Tabs items={items} defaultActiveKey="1" />
        </div>
    )   
}

export default Report;