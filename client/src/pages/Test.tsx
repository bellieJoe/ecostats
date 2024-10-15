import React, { useState } from 'react';
import DataGrid, { Column } from 'react-data-grid';
import * as XLSX from 'xlsx';

interface RowData {
  [key: string]: string | number | boolean | null;
}

const ExcelDataGrid: React.FC = () => {
  const [columns, setColumns] = useState<Column<RowData>[]>([]);
  const [rows, setRows] = useState<RowData[]>([]);


  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

        if (jsonData.length === 0) {
          return;
        }

        // Extract columns and rows from the JSON data
        const cols: Column<RowData>[] = jsonData[0].map((col, index) => ({
          key: index.toString(),
          name: col || `Column ${index + 1}`,
        })) as Column<RowData>[];
        
        const rowData: RowData[] = jsonData.slice(1).map((row) =>
          row.reduce((acc, val, index) => {
            acc[index.toString()] = val;
            return acc;
          }, {} as RowData)
        );

        // Set columns and rows for the data grid
        setColumns(cols);
        setRows(rowData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>
      {columns.length > 0 && rows.length > 0 && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <DataGrid
            columns={columns}
            rows={rows}
            className="react-data-grid"
          />
        </div>
      )}
    </div>
  );
};

export default ExcelDataGrid;
