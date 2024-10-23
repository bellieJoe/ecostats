
import Title from "antd/es/typography/Title";
import { FormEnum, Sector } from "../../types/forms/formNameEnum";
import { GenericFormFieldV3 } from "../../types/forms/GenericFormTypes";
import { Button, Drawer, Flex, message, Popconfirm, Space } from "antd";
import { useAuthStore } from "../../stores/useAuthStore";
import { useEffect, useRef, useState } from "react";
import { formGetByQuery, getRequestReport, requestReport } from "../../services/api/formsApi";
import { parseResError } from "../../services/errorHandler";
import CustomReportGenerator from "./GenericFormReportFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { AgGridReact } from "ag-grid-react";
import { usePreviewReportStore } from "../../stores/useReportStore";
import { useReactToPrint } from "react-to-print"

interface RequestReportFormProps {
    formName : FormEnum
    fields : GenericFormFieldV3[]
}

const RequestReportForm = ({ formName,  fields } : RequestReportFormProps) => {

    const [messageApi, contextHandler] = message.useMessage();
    const authStore = useAuthStore();
    const [open, setOpen] = useState(false);

    const handleSubmit =  async (title, description, filter, inclusions) => {
        console.log({
            title : title,
            description : description,
            filters : filter,
            fields : inclusions,
            form_name : formName,
            requested_by : authStore.user?._id
        });

        try {
            await requestReport({
                title : title,
                description : description,
                filters : filter,
                fields : inclusions,
                form_name : formName,
                requested_by : authStore.user?._id
            });
            messageApi.success("New report request successfully submitted.")
        } catch (error) {
            messageApi.error(parseResError(error).msg)
        }
    }

    return (
        <>
            { contextHandler }
            <Button onClick={() => setOpen(true)}>Request Custom Report</Button>
            <CustomReportGenerator 
            visible={open} 
            fields={fields} 
            onClose={() => setOpen(false)} 
            onSubmit={handleSubmit}/>
        </>
    )
}

interface CustomReportProps {
    formName : FormEnum
    sector : Sector
    fields : GenericFormFieldV3[]
    colDefs : any[]
}

const PreviewPrint = () => {

    const [gridKey, setGridKey] = useState<string>(`grid-key-${Math.random()}`);
    const [messageApi, contextHandler ] = message.useMessage();
    const [open, setOpen] = useState<boolean>(false);
    const [rowData, setRowData] = useState<any[]>([]);
    const previewReportStore = usePreviewReportStore();

    const printRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef: printRef })

    useEffect(() => {
        if(previewReportStore.report) {
            setOpen(true);
            setGridKey(`grid-key-${Math.random()}`)
            formGetByQuery(previewReportStore.formName!, previewReportStore.sector!, previewReportStore.report.filters)
            .then(res => {
                setRowData(res.data);
            })
            .catch(err => {
                messageApi.error(parseResError(err).msg)
            })
            .finally();
        }
        else {
            setOpen(false)
        }
    }, [previewReportStore.report]);


   
    return (
        
        <Drawer 
        footer={
             <Flex align="end" justify="end">
                <Button color="primary" variant="solid" onClick={() => reactToPrintFn()}>Print</Button>
            </Flex>
            }
        width={"100%"}
        open={open}
        onClose={() => previewReportStore.clear()}
        size="large">
            {contextHandler}
            {/* Printable area  */}
            <div className="" ref={printRef}> 

                <Title className="text-center my-4" level={4}>{previewReportStore.report && previewReportStore.report.title}</Title>
                <p className="text-center my-2">{previewReportStore.report && previewReportStore.report.description}</p>

                <div className="ag-theme-alpine w-fit mx-auto my-4" style={{width: 800}}  >
                    <AgGridReact
                        key={gridKey}
                        autoSizeStrategy={{
                            type : "fitProvidedWidth",
                            width : 800
                        }}
                        suppressClickEdit={true}
                        columnDefs={previewReportStore.colDefs}
                        rowData={rowData}
                        domLayout="autoHeight"
                        suppressHorizontalScroll={true}
                        defaultColDef={{
                            resizable: false,
                            autoHeight : true,
                            wrapText : true,
                            editable : false,
                            wrapHeaderText : true
                        }}
                        onGridReady={params => {
                            console.log(params);
                            params.api.sizeColumnsToFit();
                            const colums : any[] = []
                            previewReportStore.report.fields.forEach(e => {
                                console.log(e)
                                if(!e.included){
                                    colums.push(e.name)
                                }
                            });
                            params.api.setColumnsVisible(colums, false);
                            params.api.refreshHeader()
                        }}
                        onGridPreDestroyed = {() => {
                            console.log("destroyed")
                        }}
                    />
                </div>
            </div>
        </Drawer>
    )
}


const CustomReport = ({ formName, sector, fields, colDefs } : CustomReportProps ) => {

    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const authStore = useAuthStore();
    const previewReportStore = usePreviewReportStore();

    const columnDefs : any = [
        {
            headerName : "Title",
            field : "title"
        },
        {
            headerName : "Description",
            field : "description"
        },
        {
            headerName : "Filters",
            field : "filters",
            cellRenderer: (params) => {
                return (
                    <>
                        <Space>
                            {
                                
                            }
                        </Space>
                    </>
                )
            }
        },
        {
            headerName: "Actions",
            headerClass: "justify-center",
            cellRenderer: (params) => {
                return (
                    <>
                        <Space>
                            <Popconfirm title="Confirm Delete" description="Are you sure you want to delete this request?" >
                                <Button size="small" color="danger" variant="filled">Delete</Button>
                            </Popconfirm>
                            <Button size="small" color="primary" variant="filled" onClick={() => previewReportStore.setStore(colDefs, formName, sector, params.data)}>Preview & Print</Button>
                        </Space>
                    </>
                )
            }
        }
    ];

    

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await getRequestReport({
                    requested_by : authStore.user?._id,
                    form_name : formName
                });
                setRowData(res.data)
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        })();
    }, [refresh]);
    

    return (
        <>
            <Title level={4} className="mb-2">
                Requests  
                <Button onClick={() => setRefresh(!refresh)} size="small" icon={<FontAwesomeIcon icon={faRefresh} />}></Button>
            </Title>
            
            <RequestReportForm fields={fields} formName={formName} /><br /><br />

            <div className="ag-theme-alpine" style={{ width: '100%', height: '500px' }}>
                <AgGridReact
                    pagination={true}
                    loading={loading}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    onGridReady={(ev) => ev.api.sizeColumnsToFit()}
                />
            </div>

            <PreviewPrint />

            
        </>
    )
}

export default CustomReport;