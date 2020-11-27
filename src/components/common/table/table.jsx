import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ user, data, columns, sortColumn, onSort }) => {
  return (
    <table className='table'>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody user={user} data={data} columns={columns} />
    </table>
  )
}
export default Table
