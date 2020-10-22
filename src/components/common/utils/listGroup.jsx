/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <div className='list-group'>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
          style={{ cursor: 'pointer' }}
        >
          {item[textProperty]}
        </li>
      ))}
    </div>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
}

export default ListGroup
