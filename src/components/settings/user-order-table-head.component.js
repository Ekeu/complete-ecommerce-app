import React from 'react'

const headers = [
  {
    label: 'Product',
    scope: 'col',
    styles: 'sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal',
  },
  {
    label: 'Price',
    scope: 'col',
    styles: 'hidden w-1/5 pr-8 py-3 font-normal sm:table-cell',
  },
  {
    label: 'Status',
    scope: 'col',
    styles: 'hidden pr-8 py-3 font-normal sm:table-cell',
  },
  {
    label: 'Info',
    scope: 'col',
    styles: 'w-0 py-3 font-normal text-right',
  },
]
const UserOrderTableHead = () => {
  return (
    <thead className="sr-only text-sm text-blue-gray-500 text-left font-hind sm:not-sr-only">
      <tr>
        {headers.map(header => (
          <th key={header.label} scope={header.scope} className={header.styles}>
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default UserOrderTableHead
