"use client"

import {useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Building, Phone, Package, Award, Leaf } from "lucide-react"
import BaseLayout from "@/layouts/BaseLayout"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { getProfile } from "@/redux/slices/authSlice"


interface Quote {
  id: string
  productName: string
  productQuantity: number
  productType: string
  isPremium: boolean
  isOrganic: boolean
}

// Mock data for quotes
const mockQuotes: Quote[] = [
  {
    id: "1",
    productName: "Organic Wheat Flour",
    productQuantity: 50,
    productType: "Grain",
    isPremium: true,
    isOrganic: true,
  },
  {
    id: "2",
    productName: "Premium Rice",
    productQuantity: 25,
    productType: "Grain",
    isPremium: true,
    isOrganic: false,
  },
  {
    id: "3",
    productName: "Fresh Vegetables",
    productQuantity: 100,
    productType: "Produce",
    isPremium: false,
    isOrganic: true,
  },
  {
    id: "4",
    productName: "Dairy Products",
    productQuantity: 30,
    productType: "Dairy",
    isPremium: false,
    isOrganic: false,
  },
  {
    id: "5",
    productName: "Organic Honey",
    productQuantity: 15,
    productType: "Sweetener",
    isPremium: true,
    isOrganic: true,
  },
  {
    id: "6",
    productName: "Spice Mix",
    productQuantity: 75,
    productType: "Spices",
    isPremium: false,
    isOrganic: false,
  },
]

export default function ProfilePage() {

  const { data} = useSelector((state: RootState) => state?.auth)
  const createdAt = data?.createdAt
  ? new Date(data.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  : 'N/A'

  const dispatch = useDispatch<AppDispatch>()

  async function fetchProfile() {
    dispatch(getProfile())  

  }

  const [userInfo, setUserInfo] = useState({
    fullName: data?.fullName || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "" ,
  })


  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleUpdateProfile = () => {
    
  }

  const handleChangePassword = () => {
    console.log("Opening change password dialog")
    // Handle change password logic here
  }

  return (

    <BaseLayout>
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Hi, {data?.fullName?.split(" ")[0]} !</h1>
          <p className="mt-2 text-gray-600">Manage your account information and view your quotes</p>
        </div>

        {/* User Information Card */}
        <Card>
          <CardHeader>
            
            
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username 
                </Label>
                <Input
                  id="fullName"
                  value={userInfo?.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder={data?.fullName || "Enter your username"} 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email ID 
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={data?.email || "Enter your email"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organisation" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Customer Since 
                </Label>
                <Input
                  id="organisation"
                  value={createdAt}
                  required
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number 
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userInfo?.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder={data?.phoneNumber || 'Enter phone number'}
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" onClick={handleChangePassword}>
                Change Password
              </Button>
              <Button onClick={handleUpdateProfile}>Update Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* User Quotes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Your Quotes
            </CardTitle>
            
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockQuotes.map((quote) => (
                <Card key={quote.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{quote.productName}</h3>
                        <p className="text-sm text-gray-600 mt-1">Type: {quote.productType}</p>
                        <p className="text-sm text-gray-600 mt-1">Date: 01/01/2025</p>//
                      </div>

                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Quantity: {quote.productQuantity}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {quote.isPremium && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Premium
                          </Badge>
                        )}
                        {quote.isOrganic && (
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            <Leaf className="h-3 w-3" />
                            Organic
                          </Badge>
                        )}
                        {!quote.isPremium && !quote.isOrganic && <Badge variant="outline">Standard</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockQuotes.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes yet</h3>
                <p className="text-gray-600">Your product quotes will appear here once you create them.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </BaseLayout>
    
  )
}
