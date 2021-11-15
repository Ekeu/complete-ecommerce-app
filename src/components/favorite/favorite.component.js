import React, { useContext, useState } from 'react'
import { StarIcon as StarIconEmpty } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import axios from 'axios'

import { UserContext, FeedbackContext } from '../../contexts'
import { setSnackbar, setUser } from '../../contexts/actions'
import CustomButton from '../custom-button/custom-button.component'

const Favorite = ({
  variant,
  iconClassName,
  buttonClassName,
  iconLocation,
  label,
}) => {
  const { user, dispatch: dispatchUser } = useContext(UserContext)
  const { dispatch: dispatchFeedback } = useContext(FeedbackContext)
  const [loading, setLoading] = useState(false)

  const isFavorite = user.favorites?.find(
    favorite => favorite.variant === variant
  )

  let favoriteClassName

  if (isFavorite && iconLocation === 'pDetail') {
    favoriteClassName = 'bg-yellow-100'
  } else if (!isFavorite && iconLocation === 'pDetail') {
    favoriteClassName = 'hover:bg-blue-gray-100'
  } else {
    favoriteClassName = 'bg-transparent'
  }

  const StarComponent = isFavorite ? StarIcon : StarIconEmpty

  const handleFavorite = async () => {
    if (user.username === 'Guest') {
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: 'You must be logged in to add an item to favorites.',
        })
      )
      return
    }

    const axiosReq = isFavorite ? axios.delete : axios.post
    const axiosRoute = isFavorite ? `/favorites/${isFavorite.id}` : `/favorites`
    const axiosOpt = {
      Authorization: `Bearer ${user.jwt}`,
    }

    try {
      setLoading(true)
      const res = await axiosReq(
        process.env.GATSBY_STRAPI_URL + axiosRoute,
        {
          variant,
          headers: isFavorite ? axiosOpt : undefined,
        },
        {
          headers: axiosOpt,
        }
      )
      setLoading(false)
      dispatchFeedback(
        setSnackbar({
          status: 'success',
          message: `This product was ${
            isFavorite ? 'deleted from' : 'added to'
          } your favorites!`,
        })
      )

      let updatedFavorites = [...user.favorites]

      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter(
          favorite => favorite.id !== isFavorite.id
        )
      } else {
        updatedFavorites.push({
          id: res.data.id,
          variant: res.data.variant.id,
        })
      }

      dispatchUser(setUser({ ...user, favorites: updatedFavorites }))
    } catch (error) {
      console.error(error)
      dispatchFeedback(
        setSnackbar({
          status: 'error',
          message: `There was a problem ${
            isFavorite ? 'deleting' : 'adding'
          } this product ${
            isFavorite ? 'from' : 'to'
          } your favorites. Please try again.`,
        })
      )
    }
  }

  return (
    <CustomButton
      type={'button'}
      onClick={handleFavorite}
      spinnerColor={!isFavorite && 'text-purple-500'}
      loading={loading}
      customStyles={`items-center ${buttonClassName} ${favoriteClassName}`}
    >
      <StarComponent
        className={`flex-shrink-0 ${iconClassName} ${
          isFavorite ? 'text-yellow-500' : 'text-blue-gray-400'
        }`}
        aria-hidden="true"
      />
      {label && <span className="text-sm">{label}</span>}
    </CustomButton>
  )
}

export default Favorite
