import BaseLayout from '@/layouts/BaseLayout'
import React from 'react'

// import Image from "next/image"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Globe, Shield, Truck, Award, Users } from "lucide-react"
import jaggery from '../assets/jaggery.jpeg'
import friedOnion from '../assets/friedOnion.jpeg'


function Homepage() {
  return (
    <BaseLayout>
        <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Connecting Indian Agricultural Excellence with the World
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Premium quality Jaggery and Fried Onions exported globally. Pure, hygienic, and sustainably sourced from
                India's finest farms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <Link to="/products">View Our Products</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="./assets/"
                alt="Agricultural products - Jaggery and Fried Onions"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-800 mb-2">2025</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-800 mb-2">2</div>
              <div className="text-gray-600">Premium Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-800 mb-2">100%</div>
              <div className="text-gray-600">Quality Assured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-800 mb-2">Global</div>
              <div className="text-gray-600">Export Reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Premium Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Carefully sourced and processed to meet international quality standards
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-100">
                <img
                  src={jaggery}
                  alt="Natural Jaggery"
                  className="object-cover w-full h-full"

                />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Natural Jaggery</h3>
                <p className="text-gray-600 mb-6">
                  Pure, unrefined sweetener made from sugarcane. Rich in minerals and perfect for health-conscious
                  consumers and food processing industries.
                </p>
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>• 100% Natural & Organic</li>
                  <li>• Rich in Iron & Minerals</li>
                  <li>• Multiple packaging options</li>
                  <li>• FSSAI Certified</li>
                </ul>
                <Button asChild className="bg-green-700 hover:bg-green-800">
                  <Link to="/products/jaggery">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-100">
                <img src={friedOnion} alt="Fried Onions"  className="object-cover  w-full h-full" />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Crispy Fried Onions</h3>
                <p className="text-gray-600 mb-6">
                  Premium quality fried onions with perfect crispiness. Ideal for restaurants, food processing, and
                  culinary applications worldwide.
                </p>
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>• Perfect Golden Crispiness</li>
                  <li>• Extended Shelf Life</li>
                  <li>• Hygienic Processing</li>
                  <li>• Bulk & Retail Packaging</li>
                </ul>
                <Button asChild className="bg-green-700 hover:bg-green-800">
                  <Link to="/products/fried-onions">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Omnexa Global Trade?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium agricultural exports from India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous quality control processes and international certifications ensure premium products every time.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Sourcing</h3>
              <p className="text-gray-600">
                Direct partnerships with farmers ensuring sustainable practices and fair trade principles.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600">
                Efficient logistics network enabling timely delivery to international markets worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reliable Logistics</h3>
              <p className="text-gray-600">
                Professional packaging and shipping solutions ensuring products reach you in perfect condition.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Certified Excellence</h3>
              <p className="text-gray-600">
                ISO and FSSAI certified facilities maintaining the highest standards of hygiene and quality.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Focus</h3>
              <p className="text-gray-600">
                Dedicated support team ensuring smooth transactions and long-term business relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join our growing network of international partners and experience the quality of Indian agricultural
            products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link to="/contact">Get Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-800"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </BaseLayout>

    
  )
}

export default Homepage
