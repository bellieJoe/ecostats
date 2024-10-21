import { useEffect, useState } from "react";
import { parseResError } from "../../../../services/errorHandler";
import { formCreate, formDelete, formGet, formUpdate } from "../../../../services/api/formsApi";
import { FormEnum, Sector } from "../../../../types/forms/formNameEnum";
import { Button, Flex, Input, message, Pagination, Popconfirm, Select } from "antd";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { GenericFormField, GenericFormFieldV3 } from "../../../../types/forms/GenericFormTypes";
import GenericFormDrawer from "../../../GenericFormV3";
import { generateYearOptions } from "../../../../services/helper";

const Land_Table_4  = () => {

    const [page, setPage] = useState(1);
    const [addRecord, setAddRecord] = useState(false);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<any>([
        { 
            headerName: "CY", 
            field: "calendar_year", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Province", 
            field: "province", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "For Calendar Year", 
            children : [
                { 
                    headerName: "No. of Patents Transmitted to RoD", 
                    field: "transmitted_to_RoD", 
                    editable : true, 
                    type: "textColumn",
                },
                { 
                    headerName: "Area", 
                    field: "area", 
                    editable : true, 
                    type: "textColumn",
                },
                { 
                    headerName: "Beneficiaries",
                    headerClass : "justify-center",
                    children : [
                        { 
                            headerName: "Total Beneficiaries", 
                            field: "beneficiaries.total", 
                            editable : true, 
                            type: "textColumn",
                        },
                        { 
                            headerName: "Female", 
                            field: "beneficiaries.female", 
                            editable : true, 
                            type: "textColumn",
                        },
                        { 
                            headerName: "Male", 
                            field: "beneficiaries.male", 
                            editable : true, 
                            type: "textColumn",
                        },
                    ]
                },
            ]
        },
        { 
            headerName: "List of other Patents issued more than 5 hectares", 
            field: "other_patents", 
            editable : true, 
            type: "textColumn",
        },
        
        {
            headerName: "Actions",
            cellRenderer: (params) => {
                return (
                    <Popconfirm title="Confirm Delete" description="Are you sure you want to delete this row?" onConfirm={() => handleDelete(params.data._id)}>
                        <Button color="danger" variant="filled">Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ]);

    const genericFormFields : GenericFormFieldV3[] = [
        {
            name : "calendar_year",
            label : "Calendar Year", 
            input : (
                <Select 
                showSearch 
                options={generateYearOptions(2000, new Date().getFullYear())}
                />
            ),
            type : "input"
        },
        {
            name : "province",
            label : "Province", 
            input : <Input type="text" />,
            type : "input"
        },
        {
            name: "For Calendar Year",
            label: "For Calendar Year",
            type : "title"
        },
        {
            name : "transmitted_to_RoD",
            label : "No. of Patents transmitted to RoD", 
            input : <Input type="number" />,
            type : "input"
        },
        {
            name : "area",
            label : "Area", 
            input : <Input type="number" />,
            type : "input"
        },
        {
            name : "beneficiaries.total",
            label : "Total Beneficiaries", 
            input : <Input type="number" />,
            type : "input"
        },
        {
            name : "beneficiaries.female",
            label : "Female Beneficiaries", 
            input : <Input type="number" />,
            type : "input"
        },
        {
            name : "beneficiaries.male",
            label : "Male Beneficiaries", 
            input : <Input type="number" />,
            type : "input"
        },
        {
            name: "div",
            label: "div",
            type : "divider"
        },
        {
            name : "other_patents",
            label : "Other Patents", 
            input : <Input type="text" />,
            type : "input"
        },
    ];

    const handleOnRowValueChanged = (d) => {
        formUpdate(d.data, FormEnum.LAND_4, Sector.LAND)
        .then(res => {
            messageApi.success("Data successfully updated.");
        })
        .catch(err => {
            console.log(err)
            setRefresh(!refresh)
            messageApi.error(parseResError(err).msg)
        })
        .finally();
    }

    const handleDelete = (id) => {
        formDelete(id, FormEnum.LAND_4, Sector.LAND)
        .then(res => {
            messageApi.success("Data successfully deleted.");
        })
        .catch(err => {
            console.log(err)
            messageApi.error(parseResError(err).msg)
        })
        .finally(() => setRefresh(!refresh));
    }

    const handlePaginationChange = (current, pageSize) => {
        setPage(current);
        setLimit(pageSize);
        if (pageSize !== limit) {
            setPage(1); // Reset to the first page when page size changes
        }
    };

    const handleSubmit = async (d) => {
        console.log(d)
        try {
            await formCreate(d, FormEnum.LAND_4, Sector.LAND)
            messageApi.success("Data successfully inserted.");
        } catch (err) {
            messageApi.error(parseResError(err).msg)
        }
        setRefresh(!refresh)

    };
    
    useEffect(() => {
        setLoading(true)
        formGet(FormEnum.LAND_4, Sector.LAND, limit, page)
        .then(res => {
            console.log(res.data)
            setTotal(res.data.total)
            setRowData(res.data.models);
        })
        .catch(err => {
            console.log(err);
            messageApi.error(parseResError(err).msg);
        })
        .finally(() => setLoading(false));
    }, [page, limit, refresh]);

    useEffect(() => {
        setPage(1)
    }, [refresh]);


    return (
        <>
            {contextHolder}
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
                >
                <Flex justify="end" className="mb-2">
                    <Button onClick={() => setAddRecord(true)} color="primary" variant="solid">Add Data</Button>
                    <Button onClick={() => setRefresh(!refresh)} variant="text" color="primary"><FontAwesomeIcon icon={faArrowsRotate} /></Button>
                </Flex>

                <AgGridReact
                    gridOptions={{
                        defaultColDef: {
                            headerClass: "justify-center align-center text-center"
                        }
                    }}
                    loading={loading}
                    editType={'fullRow'}
                    rowData={rowData}
                    columnDefs={colDefs}
                    onRowValueChanged={handleOnRowValueChanged}
                />
                <Flex justify="center" className="mt-2">
                    <Pagination
                        current={page}
                        pageSize={limit}
                        total={total}
                        showSizeChanger
                        onChange={handlePaginationChange}
                        pageSizeOptions={['10', '20', '50', '100']}
                    />
                </Flex>
            </div>

            <GenericFormDrawer
            visible={addRecord} 
            fields={genericFormFields} 
            onClose={() => setAddRecord(false)} 
            onSubmit={handleSubmit} />
        </>
    )
}


export default Land_Table_4;