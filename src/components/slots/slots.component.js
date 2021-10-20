import React from 'react'

const Slots = ({
  selectedSlot,
  setSelectedSlot,
  description,
  containerStyles,
  slotStyles,
}) => {
  const saves = [
    { name: 'Save 1', label: 'one', value: 1 },
    { name: 'Save 2', label: 'two', value: 2 },
    { name: 'Save 3', label: 'three', value: 3 },
  ]

  return (
    <div
      className={`${
        containerStyles || 'bg-blue-gray-50 justify-end px-4 sm:px-6 py-3'
      } flex`}
    >
      <nav className="flex items-center justify-center">
        {description && (
          <p className="text-sm text-blue-gray-600 font-medium font-osans">
            {description}
          </p>
        )}
        <ol
          role="list"
          className={`${slotStyles || 'ml-5'} flex items-center space-x-5`}
        >
          {saves.map(save => (
            <li key={save.name} className={'cursor-pointer'}>
              {selectedSlot === save.value - 1 ? (
                <button
                  type={'button'}
                  className="relative flex items-center justify-center"
                  onClick={() => setSelectedSlot(save.value - 1)}
                >
                  <span className="absolute w-5 h-5 p-px flex">
                    <span className="w-full h-full rounded-full bg-purple-200" />
                  </span>
                  <span className="relative block w-2.5 h-2.5 bg-purple-500 rounded-full" />
                </button>
              ) : (
                <button
                  type={'button'}
                  onClick={() => setSelectedSlot(save.value - 1)}
                  className="block w-2.5 h-2.5 bg-blue-gray-200 rounded-full hover:bg-blue-gray-400"
                ></button>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Slots
