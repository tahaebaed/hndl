import React, { useEffect, useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import * as XLSX from 'xlsx';
import ExportExcel from '../exportExcel/ExportExcel';

const DownloadExcel = ({ fileName, sheetName, tableRefMulti, convert, instructions, handelSubmitMultiple }) => {
  const tableRef = useRef(null);
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        console.log(convert(data));
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <>
      <div className='text-center'>
        <h3>Important Instructions</h3>
      </div>
      <ol className='instructions'>
        <li>Download the excel file</li>
        <li>Fill the data as suppose to be filled</li>
        <li>with ENUM properties make sure it's a key sensitive</li>
        <li>{instructions}</li>
      </ol>
      <div className='d-flex justify-content-around mb-4 mt-4'>
        <ExportExcel jsonData={tableRefMulti?.current} sheetName={sheetName} fileName={fileName} />

        <label className='btn btn-warning' htmlFor='upload'>
          <i className='ti-arrow-up mx-2' />
          Upload excel file
          <input
            type='file'
            id='upload'
            className='d-none'
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
        </label>
      </div>
      <div>
        <button type='button' className='btn btn-primary' onClick={() => handelSubmitMultiple()}>Submit Multiple</button>
      </div>
    </>
  );
};

export default DownloadExcel;
