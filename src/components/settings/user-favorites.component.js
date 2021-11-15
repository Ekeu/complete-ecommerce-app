import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

import { UserContext, FeedbackContext, CartContext } from '../../contexts'
import { addToCart, setSnackbar, setUser } from '../../contexts/actions'

import RecentlyViewedProductCard from '../cards/recently-viewed-product-card.component'
import { CheckCircleIcon } from '@heroicons/react/solid'

const UserFavorites = () => {
  const [products, setProducts] = useState([])
  const [identifier, setIdentifier] = useState(null)
  const [loading, setLoading] = useState(null)

  const { dispatch: dispatchCart } = useContext(CartContext)
  const { user, dispatch: dispatchUser } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)

  const formatData = data => {
    return data.map(item => ({
      product: {
        node: {
          name: item.variants[0].product.name,
          category: {
            name: '',
          },
          variants: item.variants,
        },
      },
      variant: item.variant,
      id: item.id,
    }))
  }

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

  const data = formatData(products)

  return (
    <div className="bg-white">
      <div className="pt-0 pb-12 lg:pb-24">
        <div className="space-y-12">
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
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
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserFavorites
