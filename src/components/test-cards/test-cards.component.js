import React from 'react'
import { TEST_CARDS } from '../../constants/credit-cards.constants'
import Badge from '../badge/badge.component'

const TestCards = () => {
  return (
    <div className="bg-white">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-lg leading-6 font-semibold font-hind text-blue-gray-800 uppercase tracking-wider">
              Test Cards
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-4 pb-12 bg-white sm:mt-6 sm:pb-16 lg:pb-24">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-white" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl">
              {TEST_CARDS.map(card => (
                <div
                  key={card.brand}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden font-hind bg-white"
                >
                  <div className="px-6 py-8 sm:p-8 sm:pb-6">
                    <div>
                      <Badge
                        styles={`px-2.5 py-0.5 text-sm font-hind !font-semibold tracking-wide ${card.bgColor} ${card.color} uppercase`}
                      >
                        {card.brand}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-baseline text-2xl text-blue-gray-800 font-bold">
                      {card.number}
                    </div>
                    <p className="mt-1 text-md text-blue-gray-500">
                      Enter any {card.cvc} digits for the CVC and any future
                      date for the date.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestCards
