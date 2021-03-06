import React, { forwardRef } from 'react'
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid'

import Spinner from '../spinner/spinner.component'

const FormInput = forwardRef(
  (
    {
      handleChange,
      handlePaste,
      label,
      labelText,
      labelClassName,
      select,
      onChange,
      selectOptions,
      TrailingIcon,
      TrailingButton,
      error,
      errorTextColor,
      loadingActionButton,
      disabledActionButton,
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
     sm:text-sm font-osans ${
       TrailingButton ? 'rounded-none rounded-l-md' : 'rounded-md'
     } focus:outline-none ${inputStyles}`
    return (
      <div className={`${formInputWrapperClass}`}>
        {label && (
          <div className="flex justify-between">
            <label
              htmlFor={label}
              className={`block text-sm font-medium text-blue-gray-700 font-hind ${labelClassName}`}
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
          {select ? (
            <select
              {...register}
              {...otherProps}
              onChange={onChange}
              className={defaultInputStyles}
            >
              {selectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : multiline ? (
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
          {TrailingButton && (
            <button
              type="button"
              onClick={actionButton}
              disabled={disabledActionButton || loadingActionButton}
              className={`-ml-px relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-r-md text-white ${
                disabledActionButton
                  ? 'bg-blue-gray-300 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600'
              } focus:outline-none`}
            >
              {loadingActionButton ? (
                <Spinner size={'h-5 w-5'} color={'text-white'} />
              ) : (
                <TrailingButton
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              )}
            </button>
          )}

          {!error && (passwordEyeIcon || TrailingIcon) && (
            <div
              onClick={togglePassword}
              role={'button'}
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
