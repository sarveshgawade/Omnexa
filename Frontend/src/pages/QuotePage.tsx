import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Clock, Shield, Truck } from "lucide-react"
import BaseLayout from "@/layouts/BaseLayout"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import type { Product } from "@/types/product.types"
import { getAllProducts } from "@/redux/slices/productSlice"

function QuotePage() {

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


 const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    contactPersonName: "",
    companyEmail: "",
    mobileNumber: "",
    country: "",
    address: "",

    // Product Requirements
    product: "",
    quantity: "",
    packagingType: "",
    customPackaging: false,

    // Shipping & Delivery
    deliveryLocation: "",
    preferredDelivery: "",
    urgentOrder: false,

    // Additional Information
    additionalRequirements: "",
    hearAboutUs: "",

    // Terms
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Quote request submitted:", formData)
    alert(
      "Thank you for your quote request! Our team will prepare a detailed quotation and send it to you within 24 hours.",
    )
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <BaseLayout>
        <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Request a Quote</h1>
            <p className="text-xl text-green-100">
              Get a detailed quotation for our premium agricultural products. Fill out the form below and receive your
              customized quote within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Benefits */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">24-Hour Response</h3>
              <p className="text-sm text-gray-600">Quick turnaround time</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Detailed Quotation</h3>
              <p className="text-sm text-gray-600">Comprehensive pricing</p>
            </div>
            <div className="text-center">
              <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">No Obligation</h3>
              <p className="text-sm text-gray-600">Free quote service</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Shipping Included</h3>
              <p className="text-sm text-gray-600">Complete cost breakdown</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Quote Request Form</CardTitle>
                <p className="text-gray-600">
                  Please provide detailed information to help us prepare an accurate quotation for you.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName" className="mb-1">Company Name *</Label>
                        <Input
                          id="companyName"
                          placeholder="ABC Pvt Ltd"
                          value={formData.companyName}
                          onChange={(e) => handleChange("companyName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPersonName" className="mb-1">Contact Person *</Label>
                        <Input
                          id="contactPersonName"
                          placeholder="Enter your name"
                          value={formData.contactPersonName}
                          onChange={(e) => handleChange("contactPersonName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyEmail" className="mb-1">Company Email Address *</Label>
                        <Input
                          id="companyEmail"
                          type="companyEmail"
                          placeholder="john@gmail.com"
                          value={formData.companyEmail}
                          onChange={(e) => handleChange("companyEmail", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobileNumber" className="mb-1">Mobile Number *</Label>
                        <Input
                          id="mobileNumber"
                          placeholder="Please include country code"
                          value={formData.mobileNumber}
                          onChange={(e) => handleChange("mobileNumber", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="mb-1">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          placeholder="e.g., India"
                          onChange={(e) => handleChange("country", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="address" className="mb-1">Complete Address</Label>
                        <Input
                          id="address" 
                          placeholder="Street, City, State, Zip Code"
                          value={formData.address}
                          onChange={(e) => handleChange("address", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Requirements</h3>
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
                        <Label htmlFor="quantity" className="mb-1">Required Quantity *</Label>
                        <Input
                          id="quantity"
                          placeholder="e.g., 5000 kg"
                          value={formData.quantity}
                          onChange={(e) => handleChange("quantity", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="packagingType" className="mb-1">Packaging Type</Label>
                        <Select onValueChange={(value) => handleChange("packagingType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select packaging" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bulk-25kg">Bulk - 25kg bags</SelectItem>
                            <SelectItem value="bulk-50kg">Bulk - 50kg bags</SelectItem>
                            <SelectItem value="retail-500g">Retail - 500g packages</SelectItem>
                            <SelectItem value="retail-1kg">Retail - 1kg packages</SelectItem>
                            <SelectItem value="custom">Custom packaging</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 mt-8">
                        <Checkbox
                          id="customPackaging"
                          checked={formData.customPackaging}
                          onCheckedChange={(checked) => handleChange("customPackaging", checked as boolean)}
                        />
                        <Label htmlFor="customPackaging">I need custom packaging/branding</Label>
                      </div>
                    </div>
                  </div>

                  {/* Shipping & Delivery */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Delivery</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deliveryLocation" className="mb-1">Delivery Location *</Label>
                        <Input
                          id="deliveryLocation"
                          placeholder="Port/City, Country"
                          value={formData.deliveryLocation}
                          onChange={(e) => handleChange("deliveryLocation", e.target.value)}
                          required
                        />
                      </div>
                      {/* <div>
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
                            <SelectValue placeholder="Select a productId" />
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
                      </div> */}
                      <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                          id="urgentOrder"
                          checked={formData.urgentOrder}
                          onCheckedChange={(checked) => handleChange("urgentOrder", checked as boolean)}
                        />
                        <Label htmlFor="urgentOrder">This is an urgent order (within 2 weeks)</Label>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="additionalRequirements" className="mb-1">Additional Requirements or Specifications</Label>
                        <Textarea
                          id="additionalRequirements"
                          rows={4}
                          placeholder="Please specify any special requirements, quality standards, certifications needed, etc."
                          value={formData.additionalRequirements}
                          onChange={(e) => handleChange("additionalRequirements", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hearAboutUs" className="mb-1">How did you hear about us?</Label>
                        <Select onValueChange={(value) => handleChange("hearAboutUs", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Google">Google Search</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="Advertisement">Advertisement</SelectItem>
                            <SelectItem value="Friend">Friend</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleChange("agreeToTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the terms and conditions and privacy policy. I understand that this quote request is
                        not a binding order and final terms will be confirmed upon order placement. *
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-700 hover:bg-green-800 py-3"
                      disabled={!formData.agreeToTerms}
                    >
                      Submit Quote Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
              <p className="text-xl text-gray-600">
                Our streamlined quote process ensures you get accurate pricing quickly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Review & Analysis</h3>
                <p className="text-gray-600">
                  Our team reviews your requirements and analyzes the best options for your needs.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Quotation</h3>
                <p className="text-gray-600">
                  We prepare a comprehensive quote including product specifications, pricing, and shipping costs.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow-up Call</h3>
                <p className="text-gray-600">
                  Our sales team contacts you to discuss the quote and answer any questions you may have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </BaseLayout>
  )
}

export default QuotePage
