import React, { Fragment } from 'react'
import { connectHits } from 'react-instantsearch-dom'
import UserOrderHeader from '../settings/user-order-header.component'
import UserOrderTable from '../settings/user-order-table.component'

const Hits = ({ hits }) => {
  return (
    <>
      {hits.map(hit => {
        return (
          <Fragment key={hit.id}>
            <UserOrderHeader order={hit} />
            <UserOrderTable order={hit} />
          </Fragment>
        )
      })}
    </>
  )
}

const AlgoliaOrderHits = connectHits(Hits)

export default AlgoliaOrderHits
