import { Button, Flex, List, message, Popconfirm, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { generateYearOptionsFixed } from "../../../services/helper";
import { useEffect, useState } from "react";
import { sectorGetByQuery } from "../../../services/api/sectorApi";
import { parseResError } from "../../../services/errorHandler";
import { AddOutlined, Update } from "@mui/icons-material";
import AddReportDrawer from "../../../components/Admin/Configurations/AddReportDrawer";
import { useAddReportConfigStore, useUpdateReportConfigStore } from "../../../stores/useReportConfigStore";
import { report } from "process";
import { reportConfigDelete, reportConfigGetByQuery } from "../../../services/api/reportConfigApi";
import UpdateReportDrawer from "../../../components/Admin/Configurations/UpdateReportDrawer";

const RenderConfigs = ({sectorId} : {sectorId : string}) => {
    const [configs, setConfigs] = useState<any[]>([]);
    const { setReportData } = useUpdateReportConfigStore();
    const [refresh, setRefresh] = useState<boolean>(false);

    const fetchConfigs = async () => {
        try {
            const _configs = (await reportConfigGetByQuery({sector : sectorId}, ["sector"])).data;
            setConfigs(_configs);
            console.log(_configs)
        } catch (error) {
            message.error(parseResError(error).msg);
        }
    }
    
    const handleDelete = async (id) => {
        try {
            await reportConfigDelete(id);
            message.success("Report Config deleted successfully.");
            setRefresh(!refresh);
        } catch (error) {
            message.error(parseResError(error).msg, 10);
        }
    }


    useEffect(() => {
        fetchConfigs();
    }, [sectorId, refresh]);

    return (
        <List dataSource={configs} 
        className="mt-4"
        bordered
        renderItem={(config) => (
            <List.Item>
                <Flex className="w-full" justify="space-between">
                    <Flex vertical>
                        <p><span className="font-semibold">Name :</span> {config.name}</p>
                        <p><span className="font-semibold">Identifier :</span> {config.identifier}</p>
                    </Flex>
                    <Flex gap={4}>
                        <Popconfirm title="Confirm Delete" description="Are you sure you want to delete this Report Configuration?" onConfirm={() => handleDelete(config._id)}>
                            <Button size="small" variant="solid" color="danger">Delete</Button>
                        </Popconfirm>
                        <Button size="small" >Update</Button>
                        <Button size="small" >Fields</Button>
                    </Flex>
                </Flex>
            </List.Item>
        )} />
    )
}


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

                    <RenderConfigs sectorId={sector._id} />
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
            {/* <UpdateReportDrawer onClose={() => setRefresh(!refresh)} /> */}
        </div>
    );
}

export default ReportConfiguration;
