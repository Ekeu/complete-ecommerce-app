import React from 'react'
import { connectCurrentRefinements } from 'react-instantsearch-core'

const ClearRefinements = ({ items, refine }) => {
  const handleClearRefinements = () => {
    const rls = document.getElementsByName('rls')
    for (let index = 0; index < rls.length; index++) {
      if (rls[index].type === 'checkbox') {
        rls[index].checked = false
      }
    }
    refine(items)
  }
  return (
    <button
      type="button"
      onClick={handleClearRefinements}
      className="text-blue-gray-500"
      disabled={!items.length}
    >
      Clear all
    </button>
  )
}

const AlgoliaClearRefinements = connectCurrentRefinements(ClearRefinements)

export default AlgoliaClearRefinements
