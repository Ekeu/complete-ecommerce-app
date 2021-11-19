import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import {
  InstantSearch,
  Pagination,
  Configure,
  Hits,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'

import { UserContext, FeedbackContext, CartContext } from '../../contexts'
import { addToCart, setSnackbar, setUser } from '../../contexts/actions'

import RecentlyViewedProductCard from '../cards/recently-viewed-product-card.component'
import { CheckCircleIcon } from '@heroicons/react/solid'
import AlgoliaFavoriteHits from '../algolia/algolia-favorite-hits.component'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const UserFavorites = () => {
  const [products, setProducts] = useState([])
  const [identifier, setIdentifier] = useState(null)
  const [loading, setLoading] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const { dispatch: dispatchCart } = useContext(CartContext)
  const { user, dispatch: dispatchUser } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const handleAddToCart = (variant, productName, stock, idFav) => {
    setIdentifier(idFav)
    dispatchCart(addToCart(variant, 1, productName, stock))
  }

  const handleRemoveFromFav = async idFav => {
    try {
      setLoading(idFav)

      await axios.delete(
        process.env.GATSBY_STRAPI_URL + `/favorites/${idFav}`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      setLoading(null)
      const updatedProducts = products.filter(product => product.id !== idFav)
      const updatedFavorites = user.favorites.filter(
        favorite => favorite.id !== idFav
      )
      setProducts(updatedProducts)
      dispatchUser(setUser({ ...user, favorites: updatedFavorites }))

      dispatchFeedback(
        setSnackbar({
          status: 'success',
          message: `This product was deleted from your favorites!`,
        })
      )
    } catch (error) {
      console.error(error)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: `There was a problem deleting this product from your favorites. Please try again.`,
        })
      )
    }
  }

  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + '/favorites/me', {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then(res => {
        setProducts(res.data)
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: 'error',
            message:
              'There was a problem getting your favorite products. Please try again.',
          })
        )
      })
  }, [])

  useEffect(() => {
    let timer
    if (identifier) {
      timer = setTimeout(() => setIdentifier(null), 1500)
    }
    return () => clearTimeout(timer)
  }, [identifier])

  useEffect(() => {
    const id = setInterval(() => {
      setRefresh(!refresh)
    }, 0.001)

    return () => clearInterval(id)
  }, [refresh])

  const searchParameters = {
    clickAnalytics: true,
    hitsPerPage: 6,
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="const_favorite"
      refresh={refresh}
    >
      <Configure {...searchParameters} />
      <div className="bg-white">
        <div className="pt-0 pb-12 lg:pb-24">
          <div className="space-y-12">
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              <Hits />

              <AlgoliaFavoriteHits
                handleAddToCart={handleAddToCart}
                handleRemoveFromFav={handleRemoveFromFav}
                loading={loading}
                favorites={products}
                identifier={identifier}
              />
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-hind flex justify-center">
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  )
}

export default UserFavorites
