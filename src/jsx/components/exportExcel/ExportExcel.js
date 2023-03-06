import React from 'react'
import * as XSLX from 'xlsx'
import { useIntl } from 'react-intl';

function ExportExcel({ jsonData, sheetName, fileName }) {
  const intl = useIntl();

  const handleOnExport = () => {
    const workSheet = XSLX.utils.table_to_sheet(jsonData)
    const workBook = XSLX.utils.book_new()
    XSLX.utils.book_append_sheet(workBook, workSheet, sheetName)
    let buf = XSLX.write(workBook, { bookType: 'xlsx', type: 'buffer' })
    XSLX.write(workBook, { bookType: 'xlsx', type: 'binary' })
    XSLX.writeFile(workBook, `${fileName}.xlsx`)
  }
  return (
    <button className='btn btn-success' onClick={handleOnExport}>
      <i className='flaticon-381-folder-4 mx-2' />
      {intl.messages.excle_button}
    </button>
  )
}

export default ExportExcel;