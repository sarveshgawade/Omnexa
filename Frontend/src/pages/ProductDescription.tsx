import BaseLayout from '@/layouts/BaseLayout'
import { getProduct } from '@/redux/slices/productSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import type { Product } from '@/types/product.types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function ProductDescription() {

  const {state} = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const {products, productDetails} = useSelector((state:RootState) => state.products)
  const  productFromList = products.find( (p: Product) => p._id === state )
  const product : Product | undefined= productFromList || productDetails || undefined


  async function getProductDetails() {
    dispatch(getProduct(state)) 
  }
  
  useEffect(()=>{
    if(!productFromList && state){
      getProductDetails()
    }

  },[dispatch, productFromList,state])

  return (
    <BaseLayout>
      <>
        {product?.productName}
      </>
    </BaseLayout>
  )
}

export default ProductDescription
