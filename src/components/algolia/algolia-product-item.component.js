import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CheckIcon, ShoppingBagIcon } from '@heroicons/react/outline'

import { createSlug, currencyFormatter } from '../../utils/functions'
import Rating from '../rating/rating.component'
import { addToCart } from '../../contexts/actions'
import { navigate } from 'gatsby-link'

const guestToken = uuidv4()

const AlgoliaProductItem = ({ hit, insights, components, user, dispatch }) => {
  const [success, setSuccess] = useState(false)

  const handleAddToCart = () => {
    setSuccess(true)
    dispatch(addToCart(hit, 1, hit?.product.name, hit.quantity))
  }

  useEffect(() => {
    let timer
    if (success) {
      timer = setTimeout(() => setSuccess(false), 1500)
    }
    return () => clearTimeout(timer)
  }, [success])

  const handleNavigate = () => {
    navigate(
      `/${hit?.product?.category?.name?.toLowerCase()}/${createSlug(
        hit?.product?.name
      )}?gender=${hit?.gender}`
    )
    insights.clickedObjectIDsAfterSearch({
      eventName: 'PLP: Product Clicked',
      userToken: user.id || guestToken,
      index: hit.__autocomplete_indexName,
      objectIDs: [hit?.objectID],
      queryID: hit.__autocomplete_queryID,
      positions: [hit.__autocomplete_id],
    })
  }

  return (
    <span className="aa-ItemLink cursor-pointer" onClick={handleNavigate}>
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop !rounded-lg !border !border-none">
          <img
            src={process.env.GATSBY_STRAPI_URL + hit?.images[0].url}
            alt={hit?.product.name}
            width="40"
            height="40"
            className={'!object-center !object-cover !p-0'}
          />
        </div>
        <div className="aa-ItemContentBody">
          <div className="flex-auto space-y-0 text-sm">
            <h4 className="font-medium font-hind text-blue-gray-800 text-base">
              <components.Snippet hit={hit} attribute={['product', 'name']} />
            </h4>
            <p className={'font-hind text-blue-gray-800'}>{hit?.style}</p>
            <Rating
              rating={hit?.product.rating || 0}
              productId={hit?.product.name}
              customStyles={'!mb-2'}
            />
            <p className={'font-hind text-blue-gray-800'}>
              {currencyFormatter(hit?.price)}
            </p>
          </div>
        </div>
      </div>
      <div className="aa-ItemActions">
        <button
          className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
          type="button"
          title="Select"
          style={{ pointerEvents: 'none' }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
          </svg>
        </button>
        <button
          className="aa-ItemActionButton"
          type="button"
          disabled={success}
          title="Add to cart"
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            handleAddToCart()
            insights.convertedObjectIDsAfterSearch({
              eventName: 'PLP: Product Added to Cart',
              userToken: user.id || guestToken,
              index: hit.__autocomplete_indexName,
              objectIDs: [hit?.objectID],
              queryID: hit.__autocomplete_queryID,
            })
          }}
        >
          {success ? (
            <CheckIcon className={'h-5 w-5'} />
          ) : (
            <ShoppingBagIcon className={'h-5 w-5'} />
          )}
        </button>
      </div>
    </span>
  )
}

export default AlgoliaProductItem
