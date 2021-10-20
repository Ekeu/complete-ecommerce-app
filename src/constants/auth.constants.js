import React from 'react'

export const PASSWORD_CONFIG = {
  required: 'Enter your password',
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_§]).{8,}$/,
    message:
      'Password should be 8 caracters long with 1UC, 1LW, 1SC and a Number',
  },
}

export const NAME_CONFIG = {
  required: 'Enter your name',
  maxLength: {
    value: 15,
    message: 'Your name is too long',
  },
  minLength: {
    value: 3,
    message: 'Your name is too short',
  },
}

export const EMAIL_CONFIG = {
  required: 'Enter your e-mail address',
  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: 'Please enter a valid e-mail address',
  },
}

export const PHONE_CONFIG = {
  required: 'Enter your phone number',
  pattern: {
    value:
      /^((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))$/,
    message: 'Please enter a valid phone number',
  },
}

export const ZIP_CONFIG = {
  required: 'Enter your ZIP code',
  pattern: {
    value: /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code',
  },
}
export const STREET_CONFIG = {
  required: 'Enter your street address',
  pattern: {
    value:
      /^(\d+) ?([A-Za-z](?=))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/,
    message: 'Please enter a valid street address',
  },
}

export const AUTH_COMPLETE_SVG = (
  <svg
    className="mx-auto h-24 w-24 text-purple-500"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 125"
  >
    <switch>
      <foreignObject
        requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
        x="0"
        y="0"
        width="1"
        height="1"
      />
      <g extraneous="self">
        <path d="M96.8,18.8c-1-1.2-2.8-1.3-3.9-0.2c-4.4,3.9-8.5,7.9-12.5,12.1c-4,4.2-7.9,8.5-11.6,12.9c-5.6,6.6-10.9,13.4-15.9,20.6    l-6.8-7.6c1.6-2.6,3.1-5.1,4.5-7.2c3.1-4.7,6.4-9.3,9.7-13.7c3.4-4.5,6.9-8.9,10.6-13l0.1-0.1c0.9-1,1-2.6,0-3.7    c-1-1.2-2.8-1.3-3.9-0.2c-4.4,3.9-8.5,7.9-12.5,12.1c-4,4.2-7.9,8.5-11.6,12.9c-1.4,1.6-2.6,3.3-4,4.9l-5.9-6.6    c-0.9-0.9-2.3-1.2-3.5-0.5c-1.3,0.8-1.8,2.5-1,3.8c0,0,2.4,4.1,5.5,9.4c-2.4,3.1-4.8,6.3-7,9.6L7.4,41.9C6.5,41,5,40.7,3.9,41.4    c-1.3,0.8-1.8,2.5-1,3.8c0,0,18.9,32.6,19.6,33.8c0.7,1.2,2.3,3.1,5.5,3.1c3.1,0,4.8-1.8,5.8-3.8c0.5-1,3.4-6.3,6.9-12.4    c3.9,6.7,7.3,12.6,7.6,13.1c0.7,1.2,2.3,3.1,5.5,3.1c3.1,0,4.8-1.8,5.8-3.8c1-2,10.6-19.6,16.8-29c3.1-4.7,6.4-9.3,9.7-13.7    c3.4-4.5,6.9-8.9,10.6-13l0.1-0.1C97.7,21.5,97.7,19.9,96.8,18.8z" />
      </g>
    </switch>
  </svg>
)
