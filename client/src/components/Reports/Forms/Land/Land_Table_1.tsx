import { useEffect, useState } from "react";
import { parseResError } from "../../../../services/errorHandler";
import { formCreate, formDelete, formGet, formUpdate } from "../../../../services/api/formsApi";
import { FormEnum, Sector } from "../../../../types/forms/formNameEnum";
import { Button, Checkbox, DatePicker, Flex, Input, message, Pagination, Popconfirm } from "antd";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import GenericFormDrawer from "../../../GenericFormV2";
import { GenericFormField } from "../../../../types/forms/GenericFormTypes";

const Land_Table_1  = () => {

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
            headerName: "Calendar year", 
            headerClass: "justify-center", 
            field: "calendar_year", 
            editable : true, 
            type: "numberColumn",
        },
        { 
            headerName: "Province", 
            headerClass: "justify-center", 
            field: "province", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Contested Area (ha)", 
            field: "uncontested_area", 
            editable : true, 
            type: "numberColumn" 

        },
        { 
            headerName: " Uncontested Area (ha)", 
            field: "contested_area", 
            editable : true, 
            type: "numberColumn" 

        },
        {
            headerName: "Actions",
            headerClass: "justify-center",
            cellRenderer: (params) => {
                return (
                    <Popconfirm title="Confirm Delete" description="Are you sure you want to delete this row?" onConfirm={() => handleDelete(params.data._id)}>
                        <Button color="danger" variant="filled">Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ]);

    const genericFormFields : GenericFormField[] = [
        {
            name : "calendar_year",
            label : "Calendar Year", 
            input : <Input type="Number" />
        },
        {
            name : "province",
            label : "Province", 
            input : <Input type="text" />
        },
        {
            name : "contested_area",
            label : "Contested Area {(ha)",
            input : <Input type="number" />
        },
        {
            name : "uncontested_area",
            label : "Unontested Area {(ha)",
            input : <Input type="number" />
        },
    ]

    const handleOnRowValueChanged = (d) => {
        formUpdate(d.data, FormEnum.LAND_1, Sector.LAND)
        .then(res => {
            messageApi.success("Data successfully updated.");
        })
        .catch(err => {
            console.log(err)
            setRefresh(!refresh)
        })
        .finally();
    }

    const handleDelete = (id) => {
        formDelete(id, FormEnum.LAND_1, Sector.LAND)
        .then(res => {
            messageApi.success("Data successfully deleted.");
        })
        .catch(err => {
            console.log(err)
            
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
        try {
            await formCreate(d, FormEnum.LAND_1, Sector.LAND)
            messageApi.success("Data successfully inserted.");
        } catch (err) {
            console.log(err)
        }
        setRefresh(!refresh)

    };
    
    useEffect(() => {
        setLoading(true)
        formGet(FormEnum.LAND_1, Sector.LAND, limit, page)
        .then(res => {
            console.log(res)
            setTotal(res.data.total)
            setRowData(res.data.models);
        })
        .catch(err => {
            console.log(err);
            messageApi.error(parseResError(err).msg);
        })
        .finally(() => setLoading(false));
    }, [page, refresh, limit]);

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


export default Land_Table_1;


const data  = [
    {
        name : "name",
        label : "Name",
        input : <Input type="string" />
    },
    {
        name : "age",
        label : "Age",
        input : <Input type="number" />,
    },
    {
        name : "is_active",
        label : "Active",
        input : <Checkbox />,
    },
    {
        age : "date",
        label : "Date",
        input : <DatePicker />,
    }
]