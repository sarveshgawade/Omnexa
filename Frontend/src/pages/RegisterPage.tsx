import BaseLayout from '@/layouts/BaseLayout'
import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch } from 'react-redux'
import { signUp } from '@/redux/slices/authSlice'
import type { AppDispatch } from '@/redux/store'
import type { RegisterFormDataType } from '@/types/auth.types'


function RegisterPage() {


  const countryCodes = [
  { name: "India", code: "+91", iso: "IN" },
  { name: "United States", code: "+1", iso: "US" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "Australia", code: "+61", iso: "AU" },
  { name: "Germany", code: "+49", iso: "DE" },
  { name: "France", code: "+33", iso: "FR" },
  { name: "UAE", code: "+971", iso: "AE" },
  { name: "Singapore", code: "+65", iso: "SG" },
  { name: "Japan", code: "+81", iso: "JP" },
];

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    countryIso: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  async function handleSubmit(){
  
    if(validateForm(formData)){

      const formDataToSend = {
        fullName: formData.fullName,
        email: formData.email ,
        phoneNumber: formData.countryIso.split('-')[0] +  "-" +formData.phoneNumber,
        password: formData.password
      }

      const response = await dispatch(signUp(formDataToSend))
      
      if(response?.payload?.success){

          toast.success('Please login to proceed !')

          navigate('/login')

           setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            countryIso: '',
          })
      }

    }      
   
  }

    function validateForm(formData:RegisterFormDataType) : boolean{

      if(!formData.fullName ){
          toast.error('Full name is a required field  !')
          return false
      }

      if(!formData.email){
        toast.error('Email is a required field !')
          return false
      }
      if(!formData.phoneNumber ){
        toast.error('Phone Number is a required field !')
          return false
      }
      if( !formData.password){
        toast.error('Password is a required field !')
          return false
      }
      if(  !formData.countryIso){
        toast.error('Country ISO Code is a required field !')
          return false
      }

      if(formData.fullName.length < 6){
        toast.error('Full name should be atleast of 5 characters!')
        return false
      }

      if(!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/)){
        toast.error('Enter a strong password !')
        return false
      }

      if(!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
        toast.error('Enter a valid email !')
        return false
      }

      if(formData.phoneNumber.length < 5){
        toast.error('Enter a valid phone number !')
        return false
      }

      return true
    }

  return (
    <BaseLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className='text-xl'>Register</CardTitle>
            {/* <CardDescription>
              Fill in your details to register
            </CardDescription> */}
            <CardAction>
              <Button variant="link" className='cursor-pointer' onClick={() => navigate('/login')}>Already have an account? Login</Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                    value={formData.fullName}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
               <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="flex gap-2">
                    {/* Country Code Dropdown */}
                    <div className="w-[120px]">
                      <Select onValueChange={(value) => setFormData({ ...formData, countryIso: value })} value={formData.countryIso}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map(({ name, code, iso }) => (
                            <SelectItem key={`${code}-${iso}`} value={`${code}-${iso}`}>
                              <div className="flex items-center gap-2">
                                <img
                                  src={`https://flagcdn.com/w20/${iso.toLowerCase()}.png`}
                                  alt={name}
                                  className="w-5 h-4 rounded-sm object-cover"
                                />
                                <span className="text-sm">{code}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Phone Number Input */}
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="1234567890"
                      required
                      onChange={handleChange}
                      value={formData.phoneNumber}
                      className="flex-1"
                    />
                  </div>
                </div>



                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button onClick={handleSubmit} className="w-full cursor-pointer" >
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </BaseLayout>
  )
}

export default RegisterPage
