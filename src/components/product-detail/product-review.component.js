import React, { useContext, useState } from 'react'
import moment from 'moment'
import axios from 'axios'

import Rating from '../rating/rating.component'
import Dropdown from '../dropdown/dropdown.component'
import DropdownOption from '../dropdown/dropdown-option.component'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { FeedbackContext } from '../../contexts'
import { setSnackbar } from '../../contexts/actions'
import Spinner from '../spinner/spinner.component'

const ProductReview = ({
  reviews,
  setReviews,
  rating,
  reviewId,
  title,
  text,
  author,
  updatedAt,
  setEdit,
  user,
}) => {
  const [loading, setLoading] = useState(false)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)
  const handleDeleteReview = async () => {
    try {
      setLoading(true)
      await axios.delete(
        process.env.GATSBY_STRAPI_URL + `/reviews/${reviewId}`,
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
          message: 'Review deleted successfully!',
        })
      )

      const updatedReviews = [
        ...reviews.filter(review => review.id !== reviewId),
      ]
      setReviews(updatedReviews)
    } catch (error) {
      setLoading(false)
      console.error(error)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message:
            'There was a problem deleting your review. Please try aagain',
        })
      )
    }
  }

  const productReviewOptions = [
    {
      label: 'edit',
      value: 'Edit',
      component: (
        <DropdownOption
          key={'edit'}
          description={'Edit'}
          Icon={PencilAltIcon}
          onClick={() => setEdit(true)}
        />
      ),
    },
    {
      label: 'delete',
      value: 'Delete',
      component: (
        <DropdownOption
          key={'delete'}
          description={'Delete'}
          Icon={TrashIcon}
          onClick={handleDeleteReview}
        />
      ),
    },
  ]

  return (
    <div className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:items-start">
        <div className=" flex xl:col-span-1 justify-between">
          <div className="flex items-center">
            <Rating rating={rating} productId={reviewId} />
            <p className="ml-3 text-sm text-gray-700">
              {rating}
              <span className="sr-only"> out of 5 stars</span>
            </p>
          </div>

          {user.username === author && (
            <div className="flex xl:col-span-1 xl:hidden">
              {loading ? (
                <Spinner size={'h-5 w-5'} color={'text-purple-500'} />
              ) : (
                <Dropdown options={productReviewOptions} />
              )}
            </div>
          )}
        </div>

        <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
          <h3 className="text-sm font-medium text-blue-gray-800">{title}</h3>

          <div
            className="mt-3 space-y-6 text-sm text-gray-500"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>

        {user.username === author && (
          <div className="hidden xl:flex justify-end xl:col-span-1">
            {loading ? (
              <Spinner size={'h-5 w-5'} color={'text-purple-500'} />
            ) : (
              <Dropdown options={productReviewOptions} />
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
        <p className="font-medium text-blue-gray-800">{author}</p>
        <span className="ml-4 border-l border-blue-gray-200 pl-4 text-blue-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
          {moment(updatedAt).format('LL')}
        </span>
      </div>
    </div>
  )
}

export default ProductReview
