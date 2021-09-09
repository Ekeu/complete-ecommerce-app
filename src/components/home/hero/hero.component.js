import React from 'react'

import ImageHero from './image-hero.component'
import GridContainer from './grid-container.component'
import Grid from './grid.component'

import { GRID_IMAGES } from '../../../constants/hero.constants'

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold font-hind tracking-tight text-blue-gray-800 sm:text-7xl uppercase">
              FALL FAVORITES
            </h1>
            <p className="mt-4 text-lg font-osans text-blue-gray-500">
              Get ready for the season with fresh clothing styles.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <GridContainer>
                <Grid>
                  {GRID_IMAGES.grid1.images.map(image => (
                    <ImageHero
                      publicId={image.publicId}
                      customStyles={image.styles || ''}
                    />
                  ))}
                </Grid>
                <Grid>
                  {GRID_IMAGES.grid2.images.map(image => (
                    <ImageHero
                      publicId={image.publicId}
                      customStyles={image.styles || ''}
                    />
                  ))}
                </Grid>
                <Grid>
                  {GRID_IMAGES.grid3.images.map(image => (
                    <ImageHero
                      publicId={image.publicId}
                      customStyles={image.styles || ''}
                    />
                  ))}
                </Grid>
              </GridContainer>
              <a
                href="#"
                className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
