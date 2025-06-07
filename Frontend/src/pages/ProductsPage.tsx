import React from 'react'
// import Image from "next/image"
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Shield, Award, Package } from "lucide-react"
import BaseLayout from '@/layouts/BaseLayout'

function ProductsPage() {
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
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Natural Jaggery */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-80">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Natural Jaggery"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-700">Premium Quality</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Leaf className="w-6 h-6 text-green-700" />
                  <h2 className="text-3xl font-bold text-gray-900">Natural Jaggery</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Pure, unrefined sweetener made from fresh sugarcane juice. Rich in minerals and perfect for
                  health-conscious consumers, food processing industries, and traditional cooking applications.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 100% Natural & Organic</li>
                      <li>• Rich in Iron & Minerals</li>
                      <li>• No Chemical Processing</li>
                      <li>• Traditional Production Methods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Applications:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Food & Beverage Industry</li>
                      <li>• Health Food Products</li>
                      <li>• Traditional Cooking</li>
                      <li>• Confectionery Manufacturing</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-green-700 hover:bg-green-800">
                    <Link to="/products/jaggery">View Details</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Request Quote</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fried Onions */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-80">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Crispy Fried Onions"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-600">Restaurant Grade</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Package className="w-6 h-6 text-amber-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Crispy Fried Onions</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Premium quality fried onions with perfect golden crispiness and extended shelf life. Ideal for
                  restaurants, food processing, culinary applications, and ready-to-eat food products.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Perfect Golden Crispiness</li>
                      <li>• Extended Shelf Life</li>
                      <li>• Hygienic Processing</li>
                      <li>• Consistent Quality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Applications:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Restaurant & Catering</li>
                      <li>• Food Processing</li>
                      <li>• Ready-to-Eat Products</li>
                      <li>• Culinary Garnishing</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link to="/products/fried-onions">View Details</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Request Quote</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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
              className="border-white text-white hover:bg-white hover:text-green-800"
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
