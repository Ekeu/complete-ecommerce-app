import React, { useState, useContext } from 'react'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { Link } from 'gatsby'

import { CartContext } from '../../contexts'

import SideMenuDrawer from './side-menu-drawer/side-menu-drawer.component'
import TopNavigation from './top-navigation/top-navigation.component'
import CustomLink from '../custom-link/custom-link.component'

import Logo from '../../images/icon-adidas-logo.svg'

const Header = ({ categories }) => {
  const [open, setOpen] = useState(false)
  const { cart } = useContext(CartContext)

  const routes = [
    ...categories,
    { node: { name: 'Contact Us', strapiId: 'contact-us', link: '/contact' } },
  ]

  return (
    <div className="bg-white">
      <SideMenuDrawer open={open} setOpen={setOpen} routes={routes} />
      <header className="relative">
        <nav aria-label="Top">
          <TopNavigation />
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-b border-white">
                <div className="h-16 flex items-center justify-between">
                  <div className="hidden lg:flex lg:items-center">
                    <Link to={'/'}>
                      <span className="sr-only">Adidas</span>
                      <img className="h-8 w-auto" src={Logo} alt={'Adidas'} />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    <div className="ml-8">
                      <div className="h-full flex justify-center space-x-8">
                        {routes.map(route => (
                          <CustomLink
                            key={route.node.strapiId}
                            type={'nav'}
                            link={
                              route.node.link ||
                              `/${route.node.name.toLowerCase()}`
                            }
                            customStyles="flex items-center"
                          >
                            {route.node.name}
                          </CustomLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 bg-white p-2 rounded-md text-blue-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <a
                      className="ml-2 p-2 text-blue-gray-400 hover:text-blue-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>

                  <Link to={'/'} className="lg:hidden">
                    <span className="sr-only">Adidas</span>
                    <img src={Logo} alt={'Adidas'} className="h-8 w-auto" />
                  </Link>

                  <div className="flex-1 flex items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a
                            className="-m-2 p-2 text-blue-gray-400 hover:text-blue-gray-500"
                          >
                            <span className="sr-only">Search</span>
                            <SearchIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>

                        <div className="flex">
                          <Link
                            to={'/account'}
                            className="-m-2 p-2 text-blue-gray-400 hover:text-blue-gray-500"
                          >
                            <span className="sr-only">Account</span>
                            <UserIcon className="w-6 h-6" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-blue-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <Link
                          to={'/cart'}
                          className="group -m-2 p-2 flex items-center"
                        >
                          <ShoppingCartIcon
                            className="flex-shrink-0 h-6 w-6 text-blue-gray-400 group-hover:text-blue-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium font-hind text-blue-gray-700 group-hover:text-blue-gray-800">
                            {cart.length}
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
