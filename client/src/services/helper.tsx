import _ from "lodash";
import { GenericFormFieldV3 } from "../types/forms/GenericFormTypes";
import { DatePicker, Input, Select } from "antd"

export const generateYearOptions = (startYear, endYear) => {
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;
    return {
      label: year,
      value: year,
    };
  }).reverse(); // Reverse the array to have the latest year first
};

export const generateYearOptionsFixed = generateYearOptions(2010, new Date().getFullYear());

export const municipalityOptions : any[] = [
  {
    label : "Boac",
    value : "Boac"
  },
  {
    label : "Mogpog",
    value : "Mogpog"
  },
  {
    label : "Gasan",
    value : "Gasan"
  },
  {
    label : "Sta. Cruz",
    value : "Sta. Cruz"
  },
  {
    label : "Torrijos",
    value : "Torrijos"
  },
  {
    label : "Buenavista",
    value : "Buenavista"
  },
];

export const generateColDefs = (fields : any[]) => {
  return fields?.map((field : any) => {
    const f : any =  {
      headerName: field.name,
      field: field.identifier,
      // editable : field.is_nested ? false : field.editable,
    }

    if(field.is_nested){
      f.children = field.is_nested && generateColDefs(field.children);
      return f;
    }
    else {
      f.editable = field.editable;
      f.field = field.identifier;
      if(["number", "text"].includes(field.input_type)){
        f.type = getColDefType(field.input_type);
      }
      if(field.input_type === "number"){
        f.valueFormatter = (params) => {
          return parseInt(params.value);
        }
      }
      if(field.input_type === "enum"){
        f.cellEditor = "agSelectCellEditor";
        f.cellEditorParams = {
          values : field.values
        }
      }
      if(field.input_type === "date"){
        f.cellEditor = "agDateCellEditor";
        f.valueFormatter = (params) => {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        }
        f.valueParser = (params) => {
            return new Date(params.newValue).toISOString(); 
        }
      }
      return f
    }

  })
}


const getColDefType = (type : string) => {
  if(type == "text"){
    return "textColumn";
  }
  if(type == "number"){
    return "numberColumn"
  }
}


export const flattenFields = (fields) => {
   return _.flatMapDeep(fields, field => {
      // Flatten the current field without `children`, so we only have primitive data in the output
      const flatField = {
          name: field.name,
          identifier: field.identifier,
          input_type: field.input_type || null,
          editable: field.editable,
          is_nested: field.is_nested,
          values: field.values,
          default: field.default || null,
      };

      // If the field has children, recursively flatten them with the updated identifier path
      if (Array.isArray(field.children) && field.children.length > 0) {
          // Pass unique identifier path to each child for correct flattening
          return [flatField, ...flattenFields(field.children)];
      }

      return flatField;
  });
};

