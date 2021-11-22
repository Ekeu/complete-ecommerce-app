import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { UserContext, FeedbackContext } from '../../contexts'
import { setSnackbar } from '../../contexts/actions'
import SubscriptionCard from '../cards/subscription-card.component'
import Pagination from '../pagination/pagination.component'
import Message from '../message/message.component'
import { CalendarIcon, ShoppingBagIcon } from '@heroicons/react/solid'
import { navigate } from 'gatsby-link'

const UserSubscriptions = () => {
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(FeedbackContext)

  const [subscriptions, setSubscriptions] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + '/subscriptions/me', {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then(res => setSubscriptions(res.data))
      .catch(error => {
        console.error(error)
        dispatch(
          setSnackbar({
            status: 'error',
            message:
              'There was a problem retrieving your subscriptions. Please try again.',
          })
        )
      })
  }, [])

  const itemsCountPerPage = 2
  const totalItemsCount = Math.ceil(subscriptions.length / itemsCountPerPage)

  return (
    <main className="max-w-2xl mx-auto pb-24 sm:px-4 lg:max-w-7xl lg:px-6">
      {subscriptions.length ? (
        <>
          <section aria-labelledby="subscriptions">
            <div className="space-y-8">
              {subscriptions
                ?.slice(
                  (page + 1 - 1) * itemsCountPerPage,
                  (page + 1) * itemsCountPerPage
                )
                .map(subscription => (
                  <SubscriptionCard
                    key={subscription?.id}
                    subscription={subscription}
                  />
                ))}
            </div>
          </section>
          <Pagination
            pageCount={totalItemsCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => setPage(selected)}
          />
        </>
      ) : (
        <Message
          headline={'0 items'}
          description={
            'You have no on going subscription. Start shopping and make your first subscription!'
          }
          MessageIconComponent={CalendarIcon}
          ButtonIconComponent={ShoppingBagIcon}
          buttonText={'Go Shopping'}
          onButtonClick={() => navigate('/hats')}
          buttonBackgroundStyle={'bg-gradient-to-br from-pink-500 to-rose-500'}
        />
      )}
    </main>
  )
}

export default UserSubscriptions
