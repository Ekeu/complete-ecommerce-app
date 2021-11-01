import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { UserContext, FeedbackContext } from '../../contexts'
import { setSnackbar } from '../../contexts/actions'

import Rating from '../rating/rating.component'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { BanIcon } from '@heroicons/react/solid'

const ProductReviewForm = ({ product, reviews, setEdit, setReviews }) => {
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [foundReview, setFoundReview] = useState(null)
  const { user } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm()

  const changeRating = rating => {
    setRating(rating)
  }

  const onSubmit = handleSubmit(async ({ title, review }) => {
    if (!rating) {
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message:
            'Please give a rating to the product before submitting your review!.',
        })
      )
      return
    }

    if (
      foundReview?.text === review &&
      foundReview?.title === title &&
      foundReview?.rating === rating
    ) {
      setEdit(false)
      dispatchFeedback(
        setSnackbar({
          status: 'success',
          message: 'Product reviewed successfully!',
        })
      )
      return
    }

    const axiosReq = foundReview ? axios.put : axios.post
    const axiosRoute = foundReview ? `/reviews/${foundReview.id}` : `/reviews`

    try {
      setLoading(true)
      const res = await axiosReq(
        process.env.GATSBY_STRAPI_URL + axiosRoute,
        {
          title,
          text: review,
          rating,
          product,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      setLoading(false)
      dispatchFeedback(
        setSnackbar({
          status: 'success',
          message: 'Product reviewed successfully!',
        })
      )

      if (foundReview) {
        const updatedReviews = [...reviews]
        const foundReviewIndex = updatedReviews.indexOf(foundReview)

        updatedReviews[foundReviewIndex] = res.data

        setReviews(updatedReviews)
        setEdit(false)
      } else {
        {
          const updatedReviews = [res.data, ...reviews]
          setReviews(updatedReviews)
          setEdit(false)
        }
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: 'There was a problem leaving your review. Please try again.',
        })
      )
    }
  })

  useEffect(() => {
    const foundReview = reviews.find(
      review => review.user.username === user.username
    )
    if (foundReview) {
      setFoundReview(foundReview)
      setValue('title', foundReview.title)
      setValue('review', foundReview.text)
      setRating(foundReview.rating)
    }
  }, [])

  return (
    <form
      onSubmit={onSubmit}
      id="review-form"
      className="space-y-8 divide-y divide-blue-gray-200 mt-6"
    >
      <div className="space-y-8 divide-y divide-blue-gray-200">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium font-hind text-blue-gray-800">
                {user.username}
              </h3>
              <p className="mt-1 text-sm text-blue-gray-500">
                {moment().format('LL')}
              </p>
            </div>
            <Rating
              productId={'Product review rating'}
              rating={rating}
              changeRating={changeRating}
              isSelectable={true}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <FormInput
              id="title"
              name="title"
              type="text"
              label="title"
              labelText="Title"
              register={register('title', {
                required: 'Please provide a title to your review',
              })}
              placeholder="Confortable/affordable"
              formInputWrapperClass={'sm:col-span-6'}
              ringStyling={
                'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
              }
              error={errors.title?.message}
            />
            <FormInput
              id="review"
              name="review"
              multiline
              label="review"
              labelText="Review"
              rows={5}
              hintText={'Max. 500 characters'}
              register={register('review', {
                required: "You can't send an empty review",
                maxLength: {
                  value: 500,
                  message: "You've reached the maximum amount of characters",
                },
              })}
              formInputWrapperClass={'sm:col-span-6'}
              ringStyling={
                'focus:ring-purple-500 focus:border-purple-500 border-blue-gray-300'
              }
              placeholder="Good price. Good for gym use..."
              error={errors.review?.message}
            />
          </div>
          <div className="mt-3 flex items-center justify-end space-x-4">
            <CustomButton
              type="button"
              onClick={() => setEdit(false)}
              customStyles="inline-flex px-4 py-2 border border-blue-gray-300 text-sm text-blue-gray-700 bg-white hover:bg-blue-gray-50"
            >
              <BanIcon
                className="-ml-1 mr-2 h-5 w-5 text-rose-500"
                aria-hidden="true"
              />
              <span>Close</span>
            </CustomButton>
            <CustomButton
              type="submit"
              loading={loading}
              customStyles="inline-flex items-center px-4 py-2 border-transparent text-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              {foundReview ? 'Update review' : 'Leave review'}
            </CustomButton>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductReviewForm
