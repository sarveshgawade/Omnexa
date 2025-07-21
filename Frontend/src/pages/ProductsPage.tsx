import  { useEffect } from 'react'
// import Image from "next/image"
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Shield, Award, Package } from "lucide-react"
import BaseLayout from '@/layouts/BaseLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '@/redux/slices/productSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import type { Product } from '@/types/product.types'
import ProductCard from '@/components/ui/ProductCard'

function ProductsPage() {

    const dispatch = useDispatch<AppDispatch>()
    const {products} : {products: Product[]}= useSelector((state:RootState) => state.products) 

    async function loadProducts() {

      // if(!products || products.length == 0){
        dispatch(getAllProducts())
      // }
    }

    useEffect(()=> {
      loadProducts()
    },[])

  return (
    <BaseLayout>
        <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Premium Products</h1>
            <p className="text-xl text-green-100">
              Carefully sourced and processed agricultural products that meet international quality standards and exceed
              customer expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="flex flex-wrap justify-center gap-y-10 gap-x-12">
            {
              products.map((product) =>
                (
                  
                  <ProductCard product={product}  key={product?._id}/>
                  
                )
              )
            }
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quality Standards & Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every product meets international quality standards and safety requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous testing at every stage from sourcing to packaging ensures consistent quality and safety
                standards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">International Certifications</h3>
              <p className="text-gray-600">
                ISO, FSSAI, HACCP, and APEDA certified facilities maintaining the highest standards of food safety and
                quality.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Sourcing</h3>
              <p className="text-gray-600">
                Direct partnerships with farmers ensuring sustainable practices and traceability from farm to export.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Flexible Packaging Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Customized packaging options to meet your specific requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bulk Packaging</h3>
                <p className="text-gray-600 text-sm">25kg, 50kg bags for wholesale and industrial customers</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Retail Packaging</h3>
                <p className="text-gray-600 text-sm">500g, 1kg, 2kg consumer-ready packages</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Branding</h3>
                <p className="text-gray-600 text-sm">Private label and custom branding options available</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Export Packaging</h3>
                <p className="text-gray-600 text-sm">Specialized packaging for international shipping</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Place Your Order?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Contact us today for detailed product specifications, pricing, and customized packaging solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link to="/quote">Request Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-white hover:text-green-800"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </BaseLayout>
  )
}

export default ProductsPage
