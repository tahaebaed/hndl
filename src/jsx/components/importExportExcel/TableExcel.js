import React from 'react';

const TableExcel = ({ columns, tableRefMulti }) => {
  return (
    <div>
      <table className='d-none' ref={tableRefMulti}>
        <thead>
          <tr>{columns && columns.map((x, i) => <th key={i}>{x.Header}</th>)}</tr>
        </thead>
      </table>
    </div>
  );
};

export default TableExcel;
