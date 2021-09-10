import * as React from 'react'
import Layout from '../components/layout/layout.component'
import Hero from '../components/home/hero/hero.component'
import PromoProducts from '../components/home/promo-products/promo-products.component'
import FeaturedProducts from '../components/home/featured-products/featured-products.component'
import IncentivesStack from '../components/home/incentives-stack/incentives-stack.component'
import Cta from '../components/home/cta/cta.component'

const IndexPage = () => (
  <Layout>
    <Hero />
    <PromoProducts />
    <IncentivesStack />
    <FeaturedProducts />
    <Cta />
  </Layout>
)

export default IndexPage
