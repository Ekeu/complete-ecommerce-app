import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { ChatAlt2Icon, PlusIcon } from '@heroicons/react/solid'

import { GET_REVIEWS } from '../../apollo/queries'

import ProductReviewForm from './product-review-form.component'
import ProductReview from './product-review.component'
import { UserContext } from '../../contexts'
import Pagination from '../pagination/pagination.component'
import Message from '../message/message.component'

const ProductReviews = ({ product, edit, setEdit, handleEditReview }) => {
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const { user } = useContext(UserContext)
  const { data } = useQuery(GET_REVIEWS, {
    variables: {
      id: product,
    },
  })

  useEffect(() => {
    if (data) {
      setReviews(data.product.reviews)
    }
  }, [data])

  const reviewsPerPage = 6
  const numPages = Math.ceil(reviews.length / reviewsPerPage)

  return (
    <main className="mt-8 max-w-2xl mx-auto pb-16 sm:pb-24 lg:max-w-7xl">
      <section
        aria-labelledby="reviews-heading"
        className="mt-16 sm:mt-24 px-4 sm:px-0"
      >
        <h2
          id="reviews-heading"
          className="text-xl font-bold font-hind text-blue-gray-800"
        >
          Recent reviews
        </h2>

        {edit && (
          <ProductReviewForm
            reviews={reviews}
            product={product}
            setEdit={setEdit}
            setReviews={setReviews}
          />
        )}
        {reviews.length ? (
          <>
            <div className="mt-6 border-t border-b border-blue-gray-200 pb-10 divide-y divide-blue-gray-200 space-y-10">
              {reviews
                .filter(review =>
                  edit ? review.user.username !== user.username : review
                )
                .slice((page - 1) * reviewsPerPage, page * reviewsPerPage)
                .map(review => (
                  <ProductReview
                    key={review?.id}
                    reviews={reviews}
                    setReviews={setReviews}
                    rating={review?.rating}
                    reviewId={review?.id}
                    title={review?.title}
                    text={review?.text}
                    author={review?.user.username}
                    updatedAt={review?.updatedAt}
                    setEdit={setEdit}
                    user={user}
                  />
                ))}
            </div>
            <Pagination
              pageCount={numPages}
              pageRangeDisplayed={1}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => setPage(selected + 1)}
            />
          </>
        ) : (
          <Message
            headline={'No reviews'}
            description={'Get started by creating the first review.'}
            MessageIconComponent={ChatAlt2Icon}
            ButtonIconComponent={PlusIcon}
            buttonText={'New Review'}
            onButtonClick={handleEditReview}
          />
        )}
      </section>
    </main>
  )
}

export default ProductReviews
