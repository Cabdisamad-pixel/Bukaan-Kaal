import React from 'react'
import Categories from './Categories/Categories'
import ProductPackages from './packages/ProductPackages'

const Products = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <Categories />
        <ProductPackages/>
      </div>
    </>
  )
}

export default Products