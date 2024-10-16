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

const Forestry_Table_2  = () => {

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
            headerName: "Total Land Cover Area", 
            field: "total_land_cover_area", 
            editable : true, 
            type: "numberColumn",
        },
        { 
            headerName: "Forest Cover", 
            children : [
                {
                    headerName : "Total Forest Cover",
                    field: "forest_cover.total_forest_cover", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Closed Forest",
                    field: "forest_cover.closed_forest", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Open Forest",
                    field: "forest_cover.open_forest", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Mangrove Forest",
                    field: "forest_cover.mangrove_forest", 
                    editable : true, 
                    type: "numberColumn",
                },
            ]
        },
        { 
            headerName: "Other Land Cover", 
            children : [
                {
                    headerName : "Total Other Land Cover",
                    field: "other_land_cover.total_other_land_cover", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Brush/ Shrubs",
                    field: "other_land_cover.brush_shrubs", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Grassland",
                    field: "other_land_cover.grassland", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Annual Crop",
                    field: "other_land_cover.annual_crop", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Perennial Crop",
                    field: "other_land_cover.perennial_crop", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Open/Barren Land",
                    field: "other_land_cover.open_barren_land", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Built-up Area",
                    field: "other_land_cover.built_up_area", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Fishpond",
                    field: "other_land_cover.fishpond", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Marshland/ Swamp",
                    field: "other_land_cover.marshland_swamp", 
                    editable : true, 
                    type: "numberColumn",
                },
                {
                    headerName : "Inland Water",
                    field: "other_land_cover.inland_water", 
                    editable : true, 
                    type: "numberColumn",
                }
            ]
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
                <Input type="text"  />
            ),
            type : "input"
        },
        {
            name : "total_land_cover_area",
            label : "Total Land Cover Area", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "title_1",
            label : "Forest Cover", 
            type : "title"
        },
        {
            name : "forest_cover.total_forest_cover",
            label : "Total Forest Cover", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "forest_cover.closed_forest",
            label : "Closed Forest", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "forest_cover.open_forest",
            label : "Open Forest", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "forest_cover.mangrove_forest",
            label : "Mangrove Forest", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "title_2",
            label : "Other Land Cover", 
            type : "title"
        },
        {
            name : "other_land_cover.total_other_land_cover",
            label : "Total Other Land Cover", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.brush_shrubs",
            label : "Brush/Shrubs", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.grassland",
            label : "Grassland", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.annual_crop",
            label : "Annual Crop", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.perennial_crop",
            label : "Perennial Crop", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.open_barren_land",
            label : "Open/Barren Land", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.built_up_area",
            label : "Built-up Area", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.fishpond",
            label : "Fishpond", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.marshland_swamp",
            label : "Marshland/ Swamp", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        {
            name : "other_land_cover.inland_water",
            label : "Inland Water", 
            input : (
                <Input type="number"  />
            ),
            type : "input"
        },
        
    ];

    const handleOnRowValueChanged = (d) => {
        d.data.total_beneficiaries = d.data.male_beneficiaries + d.data.female_beneficiaries;
        console.log(d)
        formUpdate(d.data, FormEnum.FORESTRY_2, Sector.FORESTRY)
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
        formDelete(id, FormEnum.FORESTRY_2, Sector.FORESTRY)
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
            d.total_beneficiaries = parseInt(d.male_beneficiaries) + parseInt(d.female_beneficiaries);
            await formCreate(d, FormEnum.FORESTRY_2, Sector.FORESTRY)
            messageApi.success("Data successfully inserted.");
        } catch (err) {
            messageApi.error(parseResError(err).msg)
        }
        setRefresh(!refresh)

    };
    
    useEffect(() => {
        setLoading(true)
        formGet(FormEnum.FORESTRY_2, Sector.FORESTRY, limit, page)
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


export default Forestry_Table_2;