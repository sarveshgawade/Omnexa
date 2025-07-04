import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import BaseLayout from '@/layouts/BaseLayout'
import { sendResetPasswordEmail } from '@/redux/slices/authSlice'
import type { AppDispatch } from '@/redux/store'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

function ForgotPassword() {
  const [email, setEmail] = useState<string>('')
  const [emailSent, setEmailSent] = useState<boolean>(
    localStorage.getItem('emailResetSent') === 'true'
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const sent = localStorage.getItem('emailResetSent')
    if (sent === 'true') {
      setEmailSent(true)
    }
  }, [])

  async function handleResetPassword() {
    if (!email) {
      toast.error('Email is required!')
      return
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
      toast.error('Enter a valid email!')
      return
    }

    const response = await dispatch(sendResetPasswordEmail({ email }))

    if (response?.payload?.success) {
      toast.success('Reset link sent successfully!')
      setEmailSent(true)
      localStorage.setItem('emailResetSent', 'true')
    }
  }

  function handleResend() {
    setEmailSent(false)
    localStorage.removeItem('emailResetSent')
  }

  return (
    <BaseLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Forgot Password</CardTitle>
          </CardHeader>

          <CardContent>
            {emailSent ? (
              <div className="text-sm text-center space-y-3">
                <p className="text-green-600">
                  ✅ A reset link has been sent to your email.
                </p>
                <Button variant="outline" onClick={handleResend}>
                  Resend Email
                </Button>
              </div>
            ) : (
              <form noValidate>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            )}
          </CardContent>

          {!emailSent && (
            <CardFooter className="flex-col gap-2">
              <Button onClick={handleResetPassword} className="w-full cursor-pointer">
                Send Email
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </BaseLayout>
  )
}

export default ForgotPassword
