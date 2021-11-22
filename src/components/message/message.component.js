import React from 'react'
import CustomButton from '../custom-button/custom-button.component'

const Message = ({
  headline,
  description,
  MessageIconComponent,
  ButtonIconComponent,
  buttonText,
  onButtonClick,
  buttonBackgroundStyle,
}) => {
  return (
    <div className="text-center">
      <MessageIconComponent className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{headline}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">
        <CustomButton
          onClick={onButtonClick}
          customStyles={`inline-flex items-center px-4 py-2 border-transparent !border-0 !text-sm text-white ${buttonBackgroundStyle}`}
        >
          <ButtonIconComponent
            className="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          {buttonText}
        </CustomButton>
      </div>
    </div>
  )
}

export default Message
