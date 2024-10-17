import { useEffect, useState } from "react";
import { parseResError } from "../../../../services/errorHandler";
import { formCreate, formDelete, formGet, formUpdate } from "../../../../services/api/formsApi";
import { FormEnum, Sector } from "../../../../types/forms/formNameEnum";
import { Button, DatePicker, Flex, Input, message, Pagination, Popconfirm, Select } from "antd";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { GenericFormFieldV3 } from "../../../../types/forms/GenericFormTypes";
import GenericFormDrawer from "../../../GenericFormV3";
import { generateYearOptions } from "../../../../services/helper";
import cities from "philippines/cities.json"
import province from "philippines/provinces.json"
import {barangays, municipalities} from "psgc";
import _ from 'lodash';

const Biodiversity_Table_9  = () => {
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
            type: "numberColumn",
        },
        { 
            headerName: "Province", 
            field: "province", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Municipality", 
            field: "municipality", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Barangay", 
            field: "barangay", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Name of Cave", 
            field: "name_of_cave", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Other Cave Name", 
            field: "other_cave_name", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Classification", 
            field: "classification_per_dmc", 
            editable : true, 
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["I", "II", "III"],
            }
        },

        { 
            headerName: "DMC No,", 
            field: "dmc_no", 
            editable : true, 
            type: "textColumn",
        },
        { 
            headerName: "Presence of Management Plan", 
            field: "presence_of_management_plan", 
            editable : true, 
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["Yes", "No"],
            }
        },
        {
            headerName: "Actions",
            pinned:"right",
            cellRenderer: (params) => {
                return (
                    <Popconfirm title="Confirm Delete" description="Are you sure you want to delete this row?" onConfirm={() => handleDelete(params.data._id)}>
                        <Button color="danger" variant="filled">Delete</Button>
                    </Popconfirm>
                );
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
            input : (
                <Select showSearch virtual options={province.map(val => {
                    return {
                        value: val.name,
                        label : val.name
                    }
                })}  />
            ),
            type : "input"
        },
        {
            name : "municipality",
            label : "Municipality", 
            input : (
                <Select showSearch virtual options={_.uniqBy(cities, 'name').map(val => {
                    return {
                        value: val.name,
                        label : val.name
                    }
                })}  />
            ),
            type : "input"
        },
        {
            name : "barangay",
            label : "Barangay", 
            input : (
                <Select showSearch virtual options={_.uniqBy(barangays.all(), 'name').map(val => {
                    return {
                        value: val.name,
                        label : val.name
                    }
                })}  />
            ),
            type : "input"
        },
        {
            name : "name_of_cave",
            label : "Name of Cave", 
            input : (
                <Input type="text" />
            ),
            type : "input"
        },
        {
            name : "other_cave_name",
            label : "Other Cave Name", 
            input : (
                <Input type="text" />
            ),
            type : "input",
            required : false
        },
        {
            name : "classification_per_dmc",
            label : "Classification per DMC", 
            input : (
                <Select options={[
                    {
                        value : "I",
                        label: "I"
                    },
                    {
                        value : "II",
                        label: "II"
                    },
                    {
                        value : "III",
                        label: "III"
                    },
                ]} />
            ),
            type : "input"
        },
        {
            name : "dmc_no",
            label : "DMC No.", 
            input : (
                <Input type="text" />
            ),
            type : "input"
        },
        {
            name : "presence_of_management_plan",
            label : "Presence of Management Plan", 
            input : (
                <Select options={[
                    {
                        value : "Yes",
                        label : "Yes"
                    },
                    {
                        value : "No",
                        label : "No"
                    },
                ]} />
            ),
            type : "input"
        },
    ];

    const handleOnRowValueChanged = (d) => {
        console.log(d)
        formUpdate(d.data, FormEnum.BIODIVERSITY_9, Sector.BIODIVERSITY)
        .then(res => {
            messageApi.success("Data successfully updated.");
        })
        .catch(err => {
            console.log(err) 
            messageApi.error(parseResError(err).msg)
        })
        .finally(() => setRefresh(!refresh));
    }

    const handleDelete = (id) => {
        formDelete(id, FormEnum.BIODIVERSITY_9, Sector.BIODIVERSITY)
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
        try {
            console.log(d)
            d["beneficiaries.total"] = parseInt(d["beneficiaries.female"]) + parseInt(d["beneficiaries.male"]);
            await formCreate(d, FormEnum.BIODIVERSITY_9, Sector.BIODIVERSITY)
            messageApi.success("Data successfully inserted.");
        } catch (err) {
            messageApi.error(parseResError(err).msg)
        }
        setRefresh(!refresh)

    };
    
    useEffect(() => {
        setLoading(true)
        formGet(FormEnum.BIODIVERSITY_9, Sector.BIODIVERSITY, limit, page)
        .then(res => {
            console.log(res.data)
            setTotal(res.data.total)
            setRowData(res.data.models.map(val => {
                val.date_established = new Date(val.date_established);
                return val;
            }));
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

export default Biodiversity_Table_9;