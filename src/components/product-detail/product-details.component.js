import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'

import { classNames } from '../../utils/functions'

const ProductDetails = ({ details }) => {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">
        Additional details
      </h2>

      <div className="border-t divide-y divide-gray-200">
        {details.map(detail => (
          <Disclosure as="div" key={detail.name} defaultOpen={true}>
            {({ open }) => (
              <>
                <h3>
                  <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                    <span
                      className={classNames(
                        open ? 'text-purple-600' : 'text-blue-gray-800',
                        'text-sm font-medium font-hind'
                      )}
                    >
                      {detail.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusSmIcon
                          className="block h-6 w-6 text-purple-400 group-hover:text-purple-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusSmIcon
                          className="block h-6 w-6 text-blue-gray-400 group-hover:text-blue-gray-500"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                  <ul role="list">
                    {detail.items.map(item => (
                      <li key={item} className={'font-osans'}>{item}</li>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  )
}

export default ProductDetails
