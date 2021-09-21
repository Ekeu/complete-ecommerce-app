import React from 'react'

const Filter = ({ name, filterOptions, setFilterOptions }) => {
  const handleFilter = (option, idxToChange) => {
    const newFilters = { ...filterOptions }
    newFilters[option][idxToChange].checked =
      !newFilters[option][idxToChange].checked
    setFilterOptions(newFilters)
  }
  return (
    <fieldset>
      <legend className="block font-medium capitalize font-hind">{name}</legend>
      <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
        {filterOptions[name].map((option, optionIdx) => (
          <div
            key={option.value}
            className="flex items-center text-base font-hind sm:text-sm"
          >
            <input
              id={`${name.toLowerCase()}-${optionIdx}`}
              name={`${name.toLowerCase()}[]`}
              onChange={() => handleFilter(name, optionIdx)}
              defaultValue={option.value}
              type={'checkbox'}
              className={
                'flex-shrink-0 h-4 w-4 border-blue-gray-300 rounded text-purple-600 focus:ring-white cursor-pointer'
              }
              defaultChecked={option.checked}
            />
            <label
              htmlFor={`${name.toLowerCase()}-${optionIdx}`}
              className="ml-3 min-w-0 flex-1 text-blue-gray-600 capitalize"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default Filter
