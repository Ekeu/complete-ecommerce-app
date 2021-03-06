import React, { forwardRef } from 'react'

import Spinner from '../spinner/spinner.component'

const CustomButton = forwardRef(
  (
    {
      children,
      customStyles,
      loading,
      style,
      success,
      successText,
      SuccessIcon,
      spinnerColor='text-white',
      disabled,
      ...otherProps
    },
    ref
  ) => (
    <button
      ref={ref}
      {...otherProps}
      style={{
        cursor: loading || disabled ? 'not-allowed' : undefined,
        ...style,
      }}
      disabled={loading || disabled}
      className={`${
        customStyles
          ? customStyles
          : 'py-2 px-5 border-transparent text-white bg-purple-500 hover:bg-purple-600 w-full'
      } justify-center border rounded-md shadow-sm text-base font-medium font-hind focus:outline-none`}
    >
      {loading ? (
        <Spinner size={'h-5 w-5'} color={spinnerColor} />
      ) : success ? (
        <>
          <SuccessIcon className={'-ml-1 mr-3 h-5 w-5'} />
          {successText}
        </>
      ) : (
        children
      )}
    </button>
  )
)

export default CustomButton
