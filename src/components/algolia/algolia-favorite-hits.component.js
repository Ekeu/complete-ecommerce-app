import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { connectHits } from 'react-instantsearch-dom'
import RecentlyViewedProductCard from '../cards/recently-viewed-product-card.component'

const Hits = ({
  hits,
  handleAddToCart,
  handleRemoveFromFav,
  loading,
  favorites,
  identifier,
}) => {
  const formatData = hits => {
    const newHits = hits.map(hit => {
      const favorite = favorites.find(
        favorite => hit.variant.product === favorite.variant.product
      )
      const product = favorite?.variants[0].product
      return {
        product: {
          node: {
            name: product?.name,
            category: {
              name: '',
            },
          },
        },
        variant: hit.variant,
        id: hit.id,
      }
    })

    return newHits
  }

  const data = formatData(hits)

  return (
    <>
      {data.map(d => (
        <RecentlyViewedProductCard
          key={d.id}
          product={d.product}
          variant={d.variant}
          favId={d.id}
          onClick={() =>
            handleAddToCart(
              d.variant,
              d.product.node.name,
              d.variant.quantity,
              d.id
            )
          }
          onClickFav={() => handleRemoveFromFav(d.id)}
          loading={loading === d.id}
          success={identifier === d.id}
          SuccessIcon={CheckCircleIcon}
          successText={'Product added!'}
          buttonLabel={'Add to cart'}
        />
      ))}
    </>
  )
}

const AlgoliaFavoriteHits = connectHits(Hits)

export default AlgoliaFavoriteHits
