import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import ImageHero from './image-hero.component'
import GridContainer from './grid-container.component'
import Grid from './grid.component'
import CustomLink from '../../custom-link/custom-link.component'

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold font-hind tracking-tight text-blue-gray-800 sm:text-7xl uppercase">
              Comeback Season
            </h1>
            <p className="mt-4 text-lg font-osans text-blue-gray-500">
              New goals. New dreams. All-new men's back to school styles for
              every part of your week.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <GridContainer>
                <Grid>
                  <ImageHero customStyles={'sm:opacity-0 lg:opacity-100'}>
                    <StaticImage
                      className="w-full h-full object-center object-cover"
                      alt=""
                      src={
                        'https://res.cloudinary.com/dmcookpro/image/upload/v1637764607/adidas-ecom/hero/holiday-ss21-ch1-digital-nov-hp-glp-clp-teaser-carousel-men-d_tcm196-762956_pu3hpc.jpg'
                      }
                    />
                  </ImageHero>
                  <ImageHero>
                    <StaticImage
                      className="w-full h-full object-center object-cover"
                      alt=""
                      src={
                        'https://res.cloudinary.com/dmcookpro/image/upload/v1637764935/adidas-ecom/hero/orig-fw21-nov-trends-plp-statement-stack-01-d_tcm221-807659_qmzi8z.jpg'
                      }
                    />
                  </ImageHero>
                </Grid>
                <Grid>
                  <ImageHero>
                    <StaticImage
                      className="w-full h-full object-center object-cover"
                      alt=""
                      src={
                        'https://res.cloudinary.com/dmcookpro/image/upload/v1631194923/adidas-ecom/hero/Adicolor_Essentials_Trefoil_Hoodie_Blue.jpg'
                      }
                    />
                  </ImageHero>
                  <ImageHero>
                    <StaticImage
                      className="w-full h-full object-center object-cover"
                      alt=""
                      src={
                        'https://res.cloudinary.com/dmcookpro/image/upload/v1637764609/adidas-ecom/hero/orig-fw21-nov-trends-inline-tc-carousel-v1-03_tcm221-808328_csrgbu.webp'
                      }
                    />
                  </ImageHero>
                  <ImageHero>
                    <StaticImage
                      className="w-full h-full object-center object-cover"
                      alt=""
                      src={
                        'https://res.cloudinary.com/dmcookpro/image/upload/v1631194922/adidas-ecom/hero/Drawn_Shmoofoil_Logo_Tee__Gender_Neutral__White.jpg'
                      }
                    />
                  </ImageHero>
                </Grid>
                <Grid>
                  <ImageHero customStyles={'sm:opacity-0 lg:opacity-100'}>
                    <StaticImage
                      className="w-full h-full object-center object-cover"
                      alt=""
                      src={
                        'https://res.cloudinary.com/dmcookpro/image/upload/v1637764604/adidas-ecom/hero/holiday-ss21-ch1-digital-nov-hp-glp-clp-teaser-carousel-women-d_tcm196-762960_odqnyv.jpg'
                      }
                    />
                  </ImageHero>
                  <ImageHero>
                    <StaticImage
                      className="w-full h-full object-center object-cover"
                      alt=""
                      src={
                        'https://res.cloudinary.com/dmcookpro/image/upload/v1631194922/adidas-ecom/hero/Love_Unites_Hoodie__Gender_Neutral__White.jpg'
                      }
                    />
                  </ImageHero>
                </Grid>
              </GridContainer>
              <CustomLink
                type={'link-button'}
                link={'/hats'}
                customStyles={
                  'inline-block text-center bg-purple-600 py-3 px-8 text-white hover:bg-purple-700'
                }
              >
                Shop Now
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
