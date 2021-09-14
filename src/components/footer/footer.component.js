import React from 'react'

import { SOCIAL_ICONS_LINKS } from '../../constants/social-icons.constants'

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {SOCIAL_ICONS_LINKS.map(item => (
            <a
              key={item.name}
              rel="noreferrer"
              target="_blank"
              href={item.href}
              className="text-blue-gray-400 hover:text-blue-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center font-hind text-base text-blue-gray-400">
            &copy; {new Date().getFullYear()} |{' '}
            <a
              rel="noreferrer"
              target="_blank"
              className='text-purple-500'
              href={'https://twitter.com/constjavascript'}
            >
              Built by ConstJS{' '}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
