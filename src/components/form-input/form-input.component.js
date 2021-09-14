import React, { forwardRef } from 'react'
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid'

const FormInput = forwardRef(
  (
    {
      handleChange,
      handlePaste,
      label,
      labelText,
      TrailingIcon,
      TrailingButton,
      error,
      errorTextColor,
      loadingActionButton,
      register,
      ringStyling,
      validation,
      togglePassword,
      showPassword,
      actionButton,
      passwordEyeIcon,
      formInputWrapperClass,
      helpText,
      hintText,
      idHelpText,
      multiline = false,
      inputStyles,
      ...otherProps
    },
    ref
  ) => {
    let defaultInputStyles = `${
      error
        ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
        : `border-blue-gray-300 placeholder-blue-gray-500 ${
            ringStyling
              ? ringStyling
              : 'focus:ring-transparent focus:border-blue-gray-300'
          }`
    } appearance-none block w-full 
        py-3 px-4
     sm:text-sm font-osans rounded-md focus:outline-none ${inputStyles}`
    return (
      <div className={`${formInputWrapperClass}`}>
        {label && (
          <div className="flex justify-between">
            <label
              htmlFor={label}
              className="block text-sm font-medium text-blue-gray-700 font-hind"
            >
              {labelText}
            </label>
            {hintText && (
              <span id="message-max" className="text-sm text-blue-gray-500">
                {hintText}
              </span>
            )}
          </div>
        )}
        <div className="mt-1 relative flex rounded-md shadow-sm">
          {multiline ? (
            <textarea
              {...otherProps}
              {...register}
              className={defaultInputStyles}
            />
          ) : (
            <input
              {...otherProps}
              onChange={handleChange}
              onPaste={handlePaste}
              {...register}
              className={defaultInputStyles}
            />
          )}
          {!error && (passwordEyeIcon || TrailingIcon) && (
            <div
              onClick={togglePassword}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                TrailingIcon ? 'pointer-events-none' : 'cursor-pointer'
              }`}
            >
              {TrailingIcon ? (
                <TrailingIcon
                  className="h-5 w-5 text-blue-gray-400"
                  aria-hidden="true"
                />
              ) : showPassword ? (
                <EyeIcon
                  className="h-5 w-5 text-blue-gray-700"
                  aria-hidden="true"
                />
              ) : (
                <EyeOffIcon
                  className="h-5 w-5 text-blue-gray-700"
                  aria-hidden="true"
                />
              )}
            </div>
          )}

          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && (
          <p
            className={`mt-2 font-hind text-sm text-left ${
              errorTextColor ? errorTextColor : 'text-red-600'
            }`}
            id="error"
          >
            {error}
          </p>
        )}
        {helpText && (
          <p
            className="mt-2 font-hind text-sm text-left text-blue-gray-500"
            id={idHelpText}
          >
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

export default FormInput
