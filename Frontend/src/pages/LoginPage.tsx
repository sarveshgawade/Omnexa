import BaseLayout from '@/layouts/BaseLayout'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const navigate = useNavigate()

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
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
           
          </CardFooter>
        </Card>
      </div>
    </BaseLayout>
  )
}

export default LoginPage
