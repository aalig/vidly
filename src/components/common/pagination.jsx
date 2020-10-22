/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = ({ currentPage, pageSize, itemsCount, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize)
  if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1)

  return (
    <nav aria-label='Movie pages'>
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            onClick={() => onPageChange(page)}
            key={page}
            className={currentPage === page ? 'page-item active' : 'page-item'}
          >
            <a className='page-link'>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination
