import React, { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'
import { autocomplete } from '@algolia/autocomplete-js'
import { navigate } from 'gatsby-link'

const AlgoliaAutocomplete = props => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const serach = autocomplete({
      container: containerRef.current,
      renderer: {
        createElement,
        Fragment,
      },
      render({ children }, root) {
        render(children, root)
      },
      navigator: {
        navigate({ itemUrl }) {
          navigate(itemUrl)
        },
      },
      ...props,
    })

    return () => serach.destroy()
  }, [props])

  return (
    <div ref={containerRef} id={'searchContainer'} className={'w-4/5'}></div>
  )
}

export default AlgoliaAutocomplete
