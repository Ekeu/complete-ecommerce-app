import React from 'react'

import { connectCurrentRefinements } from 'react-instantsearch-dom'

const CurrentRefinements = ({ items }) => {
  return <>{items.length} Filters</>
}

const AlgoliaCurrentRefinements = connectCurrentRefinements(CurrentRefinements)
export default AlgoliaCurrentRefinements
