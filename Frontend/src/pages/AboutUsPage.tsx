// import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Globe, Shield, Users, Award, Target } from "lucide-react"
import BaseLayout from '@/layouts/BaseLayout'
import banner from '../assets/banner.png'
import ceoImg from '../assets/aditya.jpeg'

function AboutUsPage() {
  return (
    <BaseLayout>
        <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Omnexa Global Trade</h1>
            <p className="text-xl text-green-100">
              Bridging the gap between Indian agricultural excellence and global markets through premium quality
              products and sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in May 2025, Omnexa Global Trade emerged from a vision to showcase India's agricultural heritage
                to the world. We recognized the immense potential of Indian agricultural products and the growing global
                demand for natural, high-quality food ingredients.
              </p>
              <p className="text-gray-600 mb-6">
                Starting with two flagship products - natural jaggery and crispy fried onions - we have built our
                reputation on unwavering quality standards, sustainable sourcing practices, and reliable international
                logistics.
              </p>
              <p className="text-gray-600">
                Today, we work directly with farmers and processing units across India, ensuring that every product
                meets international quality standards while supporting local agricultural communities.
              </p>
            </div>
            <div className="relative">
              <img
                src={banner}
                alt="Our agricultural processing facility"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To connect Indian agricultural excellence with the world by providing pure, hygienic, and sustainably
                  sourced products that meet international standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become a globally recognized leader in agricultural exports, promoting Indian products while
                  fostering sustainable farming practices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-600">
                  Quality, sustainability, transparency, and building lasting partnerships with farmers, customers, and
                  communities worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence goes beyond just exporting products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                Every product undergoes rigorous quality testing and certification processes to ensure international
                standards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Farmer Partnerships</h3>
              <p className="text-gray-600">
                Direct relationships with farmers ensure fair pricing, quality control, and sustainable agricultural
                practices.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Certified Excellence</h3>
              <p className="text-gray-600">
                ISO and FSSAI certified facilities maintaining the highest standards of hygiene and processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to agricultural excellence
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="text-center">
              <CardContent className="p-6">
                <img
                  src={ceoImg}
                  alt="Founder & CEO"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Founder & CEO</h3>
                <p className="text-green-700 font-medium mb-3">" Bringing India’s Agricultural Gold to Global Tables. ”</p>
                <p className="text-gray-600 text-sm">
                Building a global footprint in agro exports with Omnexa Global Trade — delivering premium Jaggery & Fried Onions across borders. <br />
                Passionate about connecting India’s finest produce with the world, one shipment at a time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Certifications & Standards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is backed by international certifications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 font-bold text-lg">ISO</span>
              </div>
              <h3 className="font-semibold text-gray-900">ISO Certified</h3>
              <p className="text-sm text-gray-600">Quality Management</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 font-bold text-lg">FSSAI</span>
              </div>
              <h3 className="font-semibold text-gray-900">FSSAI Licensed</h3>
              <p className="text-sm text-gray-600">Food Safety Standards</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 font-bold text-lg">APEDA</span>
              </div>
              <h3 className="font-semibold text-gray-900">APEDA Registered</h3>
              <p className="text-sm text-gray-600">Export Authorization</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 font-bold text-lg">HACCP</span>
              </div>
              <h3 className="font-semibold text-gray-900">HACCP Compliant</h3>
              <p className="text-sm text-gray-600">Food Safety System</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </BaseLayout>
  )
}

export default AboutUsPage
