import { Button, List, message, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { generateYearOptionsFixed } from "../../../services/helper";
import { useEffect, useState } from "react";
import { sectorGetByQuery } from "../../../services/api/sectorApi";
import { parseResError } from "../../../services/errorHandler";
import { AddOutlined } from "@mui/icons-material";
import AddReportDrawer from "../../../components/Admin/Configurations/AddReportDrawer";
import { useAddReportConfigStore } from "../../../stores/useReportConfigStore";




const ReportConfiguration =  () =>  {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [sectors, setSectors] = useState<any[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const AddReportConfigStore = useAddReportConfigStore();

    const getSectors = async () => {
        try {
            const _sectors = (await sectorGetByQuery({calendar_year : year}, [])).data;
            setSectors(_sectors);
        } catch (error) {
            message.error(parseResError(error).msg);
        }
    }

    const init = async () => {
        setLoading(true);
        await getSectors();
        setLoading(false);
    }

    const openAddForm = (sector) => {
        AddReportConfigStore.setSector(sector); 
    }

    useEffect(() => {
        init();
    }, [refresh, year]);

    const renderSectors = () => {
        return sectors.map((sector : any) => {
            return (
                <div key={sector._id} className="mb-8">
                    <Title level={5}>{sector.name}</Title>
                    <Space>
                        <Button type="primary" icon={<AddOutlined />} onClick={() => openAddForm(sector)}>Add Report</Button>
                    </Space>
                    <List>

                    </List>
                </div>
            )
        });
    }

    return (
        <div>
            <Title level={4}>Report Configuration</Title>
            <Space className="mb-4">
                <Button onClick={() => setRefresh(!refresh)}>Refresh</Button>
                <Select  placeholder="Select Year" options={generateYearOptionsFixed} value={year} onChange={(y) => setYear(y)}/>
                {/* <Button type="primary" onClick={showDrawer}>
                    Add Sector
                </Button> */}
            </Space>

            { renderSectors() }

            <AddReportDrawer   />

        </div>
    );
}

export default ReportConfiguration;
