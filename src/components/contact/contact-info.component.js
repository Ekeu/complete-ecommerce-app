import React from 'react'
import { MailIcon } from '@heroicons/react/outline'

import { SOCIAL_ICONS_LINKS } from '../../constants/social-icons.constants'

const ContactInfo = () => {
  return (
    <>
      <h3 className="text-lg font-hind font-medium text-white">
        Contact information
      </h3>
      <p className="mt-6 font-osans text-base text-purple-50 max-w-3xl">
        We’d love to hear from you! Send us a message using the form, or email
        us.
      </p>
      <dl className="mt-8 space-y-6">
        <dt>
          <span className="sr-only">Email</span>
        </dt>
        <dd className="flex text-base text-purple-50">
          <MailIcon
            className="flex-shrink-0 w-6 h-6 text-purple-200"
            aria-hidden="true"
          />
          <span className="ml-3">ulrich.ekeu.pro@gmail.com</span>
        </dd>
      </dl>
      <ul role="list" className="mt-8 flex space-x-4">
        {SOCIAL_ICONS_LINKS.map(item => (
          <li>
            <a
              key={item.name}
              rel="noreferrer"
              target="_blank"
              href={item.href}
              className={'text-purple-200 hover:text-purple-100'}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon
                className="h-6 w-6"
                aria-hidden="true"
                width={24}
                height={24}
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ContactInfo
