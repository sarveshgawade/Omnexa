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
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { sendResetPasswordEmail, signin } from '@/redux/slices/authSlice'
import type { LoginFormDataType } from '@/types/auth.types'

function LoginPage() {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
      email: '',
      password: ''
    })

    

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
      setFormData({
        ...formData,
        [e.target.id] : e.target.value
      })
    }

  function validateForm(formData:LoginFormDataType) : boolean{

    if(!formData.email){
      toast.error('Email is a required field !')
        return false
    }

    if( !formData.password){
      toast.error('Password is a required field !')
        return false
    }


    if(!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/)){
      toast.error('Enter a valid password !')
      return false
    }

    if(!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
      toast.error('Enter a valid email !')
      return false
    }


    return true
  }

  async function handleSubmit() {
    if(validateForm(formData)){
        const response = await dispatch(signin(formData))

        if(response?.payload?.success){
          navigate('/')
        }
        
    }
    
  }

  return (
    <BaseLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className='text-xl'>Login</CardTitle>
            {/* <CardDescription>
              Enter your email below to login to your account
            </CardDescription> */}
            <CardAction>
              <Button variant="link"  className='cursor-pointer' onClick={()=> navigate('/register')}>Not registered ? Sign Up</Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form noValidate onSubmit={(e)=> {e.preventDefault() ; handleSubmit()}}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-6">
                    <Label htmlFor="password">Password</Label>
                    <Button 
                      variant="link"   
                    >
                      <Link 
                        to="/forgot-password"
                        className='cursor-pointer' 
                      >
                          Forgot password ? Click here to reset
                      </Link>
                    </Button>
                    
                      </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={handleChange}  
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button onClick={handleSubmit} className="w-full cursor-pointer">
              Login
            </Button>
           
          </CardFooter>
        </Card>
      </div>
    </BaseLayout>
  )
}

export default LoginPage
