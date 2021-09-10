import React from 'react'
import { INCENTIVES_STACK } from '../../../constants/incentives-stack.constants'

import Incentive from './incentive.component'

const IncentivesStack = () => {
  return (
    <div className="bg-blue-gray-50">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {INCENTIVES_STACK.map(stack => (
            <Incentive stack={stack} key={stack.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default IncentivesStack
