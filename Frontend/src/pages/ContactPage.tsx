import React, { useEffect } from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react"
import BaseLayout from '@/layouts/BaseLayout'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import type { Product } from '@/types/product.types'
import { getAllProducts } from '@/redux/slices/productSlice'
import { addNewContact } from '@/redux/slices/contactSlice'



function ContactPage() {

   const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    country: "",
    productId: "",
    estimatedQuantity: "",
    description: "",
    productName: ""
  })

  const [selectedProductId, setSelectedProductId] = useState("");

  const dispatch = useDispatch<AppDispatch>()
    const {products} : {products: Product[]}= useSelector((state:RootState) => state.products) 

    async function loadProducts() {

      if(!products || products.length == 0){
        dispatch(getAllProducts())
      }
    }

    useEffect(()=> {
      loadProducts()
    },[dispatch,products])

  function validateForm() {
    const { fullName, email, country, description, companyName,estimatedQuantity, productId } = formData

    if (!fullName || !email || !country || !description || !companyName || !estimatedQuantity || !productId) {
      toast.error("Please fill in all required fields.")
      return false
    }

    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
          toast.error('Enter a valid email !')
          return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!validateForm()) return

    const response = await dispatch(
      addNewContact({
        ...formData,
        estimatedQuantity: Number(formData.estimatedQuantity)
      })
    )

    if(response?.payload?.success){
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        country: "",
        productId: "",
        estimatedQuantity: "",
        description: "",
        productName: ""
      })
      setSelectedProductId(""); // <-- Reset the select field
    }
    
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }


  return (
    <BaseLayout>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-green-100">
              Ready to partner with us? Get in touch for quotes, product information, or any questions about our
              agricultural exports.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Send Us a Message</CardTitle>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                </CardHeader>
                <CardContent>
                  <form noValidate onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className='mb-1'>Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleChange("fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className='mb-1'>Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName" className='mb-1'>Company Name*</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleChange("companyName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className='mb-1'>Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleChange("country", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="productId" className='mb-1'>Product Interest*</Label>
                        <Select
                          value={selectedProductId}
                          onValueChange={(value) => {
                            setSelectedProductId(value);
                            handleChange("productId", value);
                            handleChange(
                              "productName",
                              products.find((product) => product._id === value)?.productName || ""
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {
                              products && products.length > 0 ? (
                                products.map((productId) => (
                                  <SelectItem key={productId?._id} value={productId?._id || ""}>
                                    {productId?.productName}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="N/A" disabled>
                                  No products available
                                </SelectItem>
                              )
                            }
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="estimatedQuantity" className='mb-1'>Estimated Quantity*</Label>
                        <Input
                          id="estimatedQuantity"
                          placeholder="e.g., 1000 kg/month"
                          value={formData.estimatedQuantity}
                          onChange={(e) => handleChange("estimatedQuantity", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className='mb-1'>Message *</Label>
                      <Textarea
                        id="description"
                        rows={5}
                        placeholder="Please provide details about your requirements, packaging preferences, delivery location, etc."
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="cursor-pointer w-full bg-green-700 hover:bg-green-800">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Phone className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">+91-XXXX-XXXXXX</p>
                        <p className="text-sm text-gray-500">Mon-Fri 9:00 AM - 6:00 PM IST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Mail className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">info@omnexaglobal.com</p>
                        <p className="text-gray-600">sales@omnexaglobal.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Address</h4>
                        <p className="text-gray-600">
                          123 Export Street
                          <br />
                          Mumbai, Maharashtra 400001
                          <br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                        <p className="text-gray-600">+91-XXXX-XXXXXX</p>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="mt-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                        >
                          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
                            Chat on WhatsApp
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="text-gray-900">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="text-gray-900">Closed</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">* All times are in Indian Standard Time (IST)</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response Guarantee</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-green-700" />
                    <span className="text-gray-900 font-medium">24-Hour Response Time</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    We guarantee to respond to all inquiries within 24 hours during business days. For urgent matters,
                    please call us directly or use WhatsApp.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is your minimum order quantity?</h3>
                <p className="text-gray-600">
                  Our minimum order quantity varies by product. For jaggery, it's 1000 kg, and for fried onions, it's
                  500 kg. We can discuss flexible terms for new customers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you provide samples?</h3>
                <p className="text-gray-600">
                  Yes, we provide free samples (up to 500g) for quality evaluation. Shipping costs are borne by the
                  customer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are your payment terms?</h3>
                <p className="text-gray-600">
                  We accept various payment methods including LC, TT, and other secure international payment options.
                  Terms can be discussed based on order volume.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is your typical delivery time?</h3>
                <p className="text-gray-600">
                  Delivery time depends on destination and order size. Typically 15-30 days from order confirmation. We
                  provide tracking information for all shipments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </BaseLayout>
  )
}

export default ContactPage
