import BaseLayout from '@/layouts/BaseLayout'
import { getProduct } from '@/redux/slices/productSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import type { Product } from '@/types/product.types'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Star,
  Leaf,
  Package,
  Droplets,
  MessageSquare,
  Truck,
  Shield,
  Award,
  MapPin,
  Calendar,
  Scale,
  Zap,
  CheckCircle,
  Info,
} from "lucide-react"


function ProductDescription() {

  const {state} = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const {products, productDetails} = useSelector((state:RootState) => state.products)
  const  productFromList = products.find( (p: Product) => p._id === state )
  const product : Product | undefined= productFromList || productDetails || undefined

  const [selectedImage, setSelectedImage] = useState<string | undefined>(product?.productThumbnail?.secure_url)

  // const [selectedPackaging, setSelectedPackaging] = useState(product.packagingOptions[0])


  async function getProductDetails() {
    dispatch(getProduct(state))
     console.log(product);
     
  }

  useEffect(() => {
    if (product?.productThumbnail?.secure_url) {
      setSelectedImage(product.productThumbnail.secure_url)
    }
  }, [product])

  
  useEffect(()=>{
    if(!productFromList && state){
      getProductDetails()
    }

  },[dispatch, productFromList,state])

  return (
    
    <BaseLayout>
    
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-700">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-amber-700">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product?.productName}</span>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-2 text-amber-700 hover:text-amber-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden border">
                <img
                 src={
                    selectedImage
                  }
                  alt={`Main Image`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />

              </div>


            
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-10  mb-6">
                <Badge
                  className={`${product?.productType === "AGRO" ? "bg-green-600" : "bg-blue-600"} text-white text-sm px-3 py-1`}
                >
                  {product?.productType}
                </Badge>
                <div className="flex items-center gap-1 text-gray-600">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">{product?.productForm}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm">{product?.productQuantityType}</span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10">{product?.productName}</h1>

              <div className="flex flex-wrap items-center gap-8 mb-8">
                {product?.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Premium Quality
                  </Badge>
                )}
                {product?.isOrganic && (
                  <Badge className="bg-emerald-600 text-white">
                    <Leaf className="w-3 h-3 mr-1" />
                    Certified Organic
                  </Badge>
                )}
              </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Origin: Kolhapur, Maharashtra, India</span>
                </div>
            </div>        

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Shelf Life: {product?.productShelfLife} months</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4" />
                <span>Export Quality</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex flex-wrap gap-2 w-full">
              {product?.productImages?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image.secure_url)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === image.secure_url
                      ? "border-amber-500 shadow-md"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  <img
                    src={image.secure_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>


            {/* Action Buttons */}
            <div >
              <Button
                asChild
                size="lg"
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
              >
                <Link to="/quote">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Request Quote
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" className="flex-1 border-amber-600 text-amber-700 hover:bg-amber-50">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button> */}
            </div>


          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList
  className={`grid w-full ${
    product?.productType === "AGRO" ? "grid-cols-4" : "grid-cols-3"
  } bg-amber-100`}
>
  <TabsTrigger
    value="description"
    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
  >
    Description
  </TabsTrigger>
  <TabsTrigger
    value="features"
    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
  >
    Features
  </TabsTrigger>
  <TabsTrigger
    value="applications"
    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
  >
    Applications
  </TabsTrigger>
  {product?.productType === "AGRO" && (
    <TabsTrigger
      value="nutrition"
      className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
    >
      Nutrition
    </TabsTrigger>
  )}
</TabsList>


            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-amber-600" />
                    Product Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{product?.productDescription}</p>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {product?.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Applications & Uses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product?.applications.map((application, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 px-3 py-1"
                      >
                        {application}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {product?.productType === "AGRO" && (
              <TabsContent value="nutrition" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-orange-600" />
                      Nutritional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product?.nutrientContent?.map((nutrient, index) => (
                        <div key={index} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                          {/* <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</div> */}
                          <div className="text-lg font-semibold text-gray-900">{nutrient}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
{/* 
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>

        {/* Certifications */}
        {/* <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Certifications & Quality Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {product.certifications.map((cert, index) => (
                <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1">
                  <Shield className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Shipping & Packaging Info */}
        {/* <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Shipping & Packaging Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Packaging Details</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Available in multiple packaging sizes</li>
                  <li>• Food-grade packaging materials</li>
                  <li>• Moisture-proof and tamper-evident sealing</li>
                  <li>• Custom branding options available</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Shipping Information</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Worldwide shipping available</li>
                  <li>• Delivery time: 15-30 days</li>
                  <li>• FOB, CIF, CFR terms available</li>
                  <li>• Proper documentation provided</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
    </BaseLayout>
  

  )
}

export default ProductDescription
