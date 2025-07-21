"use client"

import {useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Building, Phone, Package, Award, Leaf, Eye, Trash } from "lucide-react"
import BaseLayout from "@/layouts/BaseLayout"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { changePassword, getProfile, sendResetPasswordEmail, updateProfile } from "@/redux/slices/authSlice"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { clearQuotes, deleteQuoteById, getAllQuotes, getQuotesByUser } from "@/redux/slices/quoteSlice"
import type { Quote, QuoteOnProfile } from "@/types/quote.types"
import QuoteCard from "@/components/ui/QuoteCard"


export default function ProfilePage() {

  const { data} = useSelector((state: RootState) => state?.auth)
  const [isUpdateModelOpen, setIsUpdateModelOpen] = useState(false)
  const [isChangePasswordModelOpen, setIsChangePasswordModelOpen] = useState(false)
  const [isDeleteQuoteModelOpen, setIsDeleteQuoteModelOpen] = useState(false)
  const [quoteId, setQuoteId] = useState("")
  
  const createdAt = data?.createdAt
  ? new Date(data.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  : 'N/A'

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { quotes } = useSelector((state: RootState) => state.quote) as { quotes: QuoteOnProfile[] }

  function fetchProfile() {
    dispatch(getProfile())  
  }

  async function fetchQuotes(){
    dispatch(clearQuotes())
    const response = await dispatch(getQuotesByUser())
    // console.log(response?.payload)
  }

  async function fetchAllQuotes() {
    dispatch(clearQuotes())
    const response = await dispatch(getAllQuotes())
  }

  useEffect(() => {
    if(data?.role === 'ADMIN'){
      fetchAllQuotes()
    }else{
      
      fetchQuotes()
    }
   
  }, [])
  


  const [userInfo, setUserInfo] = useState({
    fullName: data?.fullName || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "" ,
  })

  const [passwordData,setPasswordData] = useState({
    oldPassword: '' ,
    newPassword: ''
  })


  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function validate(){
    if(!userInfo.fullName ){
      toast.error('Full name is a required field  !')
      return false
    }

    if(!userInfo.email){
      toast.error('Email is a required field !')
        return false
    }

    if(!userInfo.phoneNumber ){
      toast.error('Phone Number is a required field !')
        return false
    }

    if(userInfo.fullName.length < 6){
      toast.error('Full name should be atleast of 5 characters!')
      return false
    }

    if(!userInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
      toast.error('Enter a valid email !')
      return false
    }

    if(userInfo.phoneNumber.length < 5){
      toast.error('Enter a valid phone number !')
      return false
    }

    return true
  }

  async function handleResetPassword(){
    // setIsChangePasswordModelOpen(false)
    // const response = await dispatch(sendResetPasswordEmail())
    // console.log(response.payload);
    
    navigate('/forgot-password')
  }

  const handleUpdateProfile = async () => {
    setIsUpdateModelOpen(false)
      if(validate()){
         const res = await dispatch(updateProfile(userInfo))
         if(res?.payload?.success){
          fetchProfile()

          
         }
         
      }
  }

  function validatePassword(){
    if(!passwordData.oldPassword){
      toast.error('Old password is a required field  !')
      return false
    }
    if(!passwordData.newPassword){
      toast.error('New password is a required field  !')
      return false
    }
    if(passwordData.oldPassword === passwordData.newPassword){
      toast.error('Old password and New password are same  !')
      return false
    }
    if(!passwordData.newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/)){
        toast.error('Enter a strong new password !')
        return false
      }
    return true
  }

  const handleChangePassword = async () => {
    if(validatePassword()){
      setIsChangePasswordModelOpen(false)
    
      const response = await dispatch(changePassword(passwordData))

      if(response?.payload?.success){
        fetchProfile()
      } 
    }

    setPasswordData({
      oldPassword: '',
      newPassword: ''
    })
    
  }

  const handleViewDetails = (quote: QuoteOnProfile) => {
    // You can navigate to a details page or open a modal
    console.log("Viewing details for:", quote)
    // Example: navigate(`/quotes/${quote._id}`)
  }

  const handleDeleteQuote = async (quoteId: string) => {

    setIsDeleteQuoteModelOpen(false)
    const response = await dispatch(deleteQuoteById(quoteId))
    if(response?.payload?.success){
      fetchAllQuotes()
    }
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
                  placeholder= "Enter your full name"
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
                  placeholder= "Enter your email"
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
                  placeholder= 'Enter your phone number'
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" className="cursor-pointer" onClick={()=> setIsChangePasswordModelOpen(true)}>
                Change Password
              </Button>
              <Button className="cursor-pointer " onClick={()=> setIsUpdateModelOpen(true) }>Update Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* User Quotes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {data?.role === 'ADMIN' ? 'All Quotes' : 'Your Quotes'}
            </CardTitle>
            
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              { quotes && quotes.length > 0 && quotes.map((quote) => (
                <Card key={quote?._id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{quote?.productId?.productName}</h3>
                        {
                          data?.role === 'ADMIN' && (
                            <>
                              <br />
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900">{quote?.contactPersonName}</span>
                              </div>
                            </>
                          )
                        }
                        
                        <p className="text-sm text-gray-600 mt-1">Type: {quote?.productId?.productType}</p>
                        <p className="text-sm text-gray-600 mt-1">Date: {new Date(quote?.createdAt).toLocaleDateString()}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Quantity: {quote?.requiredQty} {quote?.productId?.productQuantityType}</span>
                      </div>

                      {
                        data?.role !== 'ADMIN' && (
                          <div className="flex flex-wrap gap-2">
                        {quote?.productId?.isPremium && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Premium
                          </Badge>
                        )}
                        {quote?.productId?.isOrganic && (
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            <Leaf className="h-3 w-3" />
                            Organic
                          </Badge>
                        )}
                        {!quote?.productId?.isPremium&& !quote?.productId?.isOrganic && <Badge variant="outline">Standard</Badge>}
                      </div>
                        )
                      }
                      {data?.role === 'ADMIN' && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="icon"
                            onClick={() => navigate(`/quote/description` , {state: {quote}})}
                            aria-label="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                          <Button
                            className="cursor-pointer"
                            size="icon"
                            onClick={() => {
                              setIsDeleteQuoteModelOpen(true)
                              setQuoteId(quote?._id)
                            }}
                            aria-label="Delete"
                          >
                            <Trash className="w-5 h-5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              
            </div>

            {quotes && quotes.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes yet</h3>
                {
                  data?.role !== 'ADMIN' && (
                    <p className="text-gray-600">Your product quotes will appear here once you create them.</p>
                  )
                }
              </div>
            )}
          </CardContent>
        </Card>

        {/* update profile popup */}
        {
          isUpdateModelOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 animate-in fade-in zoom-in-95">
              <h2 className="text-lg font-semibold mb-4">Are you sure you want to change your profile ?</h2>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={()=> setIsUpdateModelOpen(false)} className="cursor-pointer">
                  Cancel
                </Button>
                <Button className="cursor-pointer " onClick={handleUpdateProfile }>Update </Button>
              </div>
            </div>
          </div>
          )
        }

        {/* change password popup */}
        {isChangePasswordModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 animate-in fade-in zoom-in-95">
              <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
              

              <div className="space-y-4">
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={passwordData?.oldPassword}
                    onChange={(e)=> handlePasswordChange("oldPassword",e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={passwordData?.newPassword}
                     onChange={(e)=> handlePasswordChange("newPassword",e.target.value)}
                  />
                </div>
                <Link 
                  to="/forgot-password" 
                  className="hover:underline" 
                >Forgot password ? Click here to reset</Link>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsChangePasswordModelOpen(false)
                    setPasswordData({
                      oldPassword: "" ,
                      newPassword: ""
                    })
                  }} 
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button onClick={handleChangePassword} className="cursor-pointer">
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        )}

         {/* delete quote popup */}
         {isDeleteQuoteModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 animate-in fade-in zoom-in-95">
              <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this quote ?</h2>

              <div className="flex justify-end gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteQuoteModelOpen(false)} 
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button onClick={()=> handleDeleteQuote(quoteId)} className="cursor-pointer">
                  Delete Quote
                </Button>
              </div>
            </div>
          </div>
        )}


        
      </div>
      </div>
    </BaseLayout>
    
  )
}

                    
                      
