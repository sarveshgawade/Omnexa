import { Button } from '@/components/ui/button'
import BaseLayout from '@/layouts/BaseLayout'
import { resetPassword, signout } from '@/redux/slices/authSlice'
import type { AppDispatch } from '@/redux/store'
import type { ResetPasswordDataType } from '@/types/auth.types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ResetPassword() {

  const {token}  = useParams()
  const navigate = useNavigate()
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  })
  const dispatch = useDispatch<AppDispatch>()

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function validate(){
    if(!passwordData.confirmNewPassword){
      toast.error('Confirm New Password field is required !')
      return false
    }
    if(!passwordData.newPassword){
      toast.error('New Password field is required !')
      return false
    }
    if(passwordData.newPassword !== passwordData.confirmNewPassword){
      toast.error(`Confirm New Password & New Password won't match !`)
      return false
    }
    if(!passwordData.newPassword .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/)){
      toast.error('Enter a strong password !')
      return false
    }
    return true
  }

  async function handleResetPassword() {
    if(validate()){
      const data : ResetPasswordDataType = {
        password : passwordData.newPassword ,
        token: token || ''
      }

      const response = await dispatch(resetPassword(data))

      if(response?.payload?.success){
        dispatch(signout())
        toast.success('Redirecting to login page ...')
        setTimeout(() => {
            navigate('/login')
        }, 2000);
      }
      
    }
  }

  return (
    <BaseLayout>
      <div className="pt-18 pb-18 flex items-center justify-center px-4 py-10 bg-gray-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Reset Your Password</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passwordData.confirmNewPassword}
                onChange={(e) => handlePasswordChange('confirmNewPassword', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button className="cursor-pointer" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default ResetPassword
