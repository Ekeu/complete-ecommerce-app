import { Link } from 'gatsby'
import React, { useEffect } from 'react'
import CustomLink from '../components/custom-link/custom-link.component'

const NotFoundPage = () => {
  useEffect(() => {
    document.body.classList.add('h-full')
    document.documentElement.classList.add('h-full')

    return () => {
      document.body.classList.remove('h-full')
      document.documentElement.classList.remove('h-full')
    }
  }, [])
  return (
    <>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-purple-600 sm:text-5xl font-osans">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-blue-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold font-hind text-blue-gray-800 tracking-tight sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-1 font-hind text-base text-blue-gray-500">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <CustomLink
                  link={'/'}
                  customStyles="inline-flex items-center px-4 py-2 text-sm shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                >
                  Go back home
                </CustomLink>
                <CustomLink
                  link={'/contact'}
                  customStyles="inline-flex items-center px-4 py-2 text-sm text-purple-700 bg-purple-100 hover:bg-purple-200"
                >
                  Contact us
                </CustomLink>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
