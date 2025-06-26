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

function RegisterPage() {

  const navigate = useNavigate()

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
                  />
                </div>
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
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+911234567890"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer">
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </BaseLayout>
  )
}

export default RegisterPage
