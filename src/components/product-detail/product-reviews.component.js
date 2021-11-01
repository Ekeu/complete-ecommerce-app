import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'

import { GET_REVIEWS } from '../../apollo/queries'

import ProductReviewForm from './product-review-form.component'
import ProductReview from './product-review.component'
import { UserContext } from '../../contexts'
import Pagination from '../pagination/pagination.component'

const ProductReviews = ({ product, edit, setEdit }) => {
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

  const reviewsPerPage = 1
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
      </section>
    </main>
  )
}

export default ProductReviews
