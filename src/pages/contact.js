import React from 'react'

import { CONSTACT_PAGE_PATTERNS } from '../constants/contact-page.constants'

import Layout from '../components/layout/layout.component'
import PatternContainer from '../components/contact/pattern-container.component'
import ContactInfo from '../components/contact/contact-info.component'
import ContactForm from '../components/contact/contact-form.component'

const ContactPage = () => {
  return (
    <Layout>
      <div className="bg-blue-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="relative bg-white shadow-xl">
            <h2 className="sr-only">Contact us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Contact information */}
              <div className="relative overflow-hidden py-10 px-6 bg-purple-700 sm:px-10 xl:p-12">
                <PatternContainer customStyles={'inset-0 sm:hidden'}>
                  {CONSTACT_PAGE_PATTERNS[0]}
                </PatternContainer>
                <PatternContainer
                  customStyles={
                    'hidden top-0 right-0 bottom-0 w-1/2 sm:block lg:hidden'
                  }
                >
                  {CONSTACT_PAGE_PATTERNS[1]}
                </PatternContainer>
                <PatternContainer
                  customStyles={'hidden top-0 right-0 bottom-0 w-1/2 lg:block'}
                >
                  {CONSTACT_PAGE_PATTERNS[2]}
                </PatternContainer>
                <ContactInfo />
              </div>

              {/* Contact form */}
              <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                <h3 className="text-lg font-medium text-gray-900">
                  Send us a message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
