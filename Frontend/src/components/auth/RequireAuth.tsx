import AccessDenied from '@/pages/AccessDenied'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner'

interface RequireAuthProps {
  allowedRoles: ('USER' | 'ADMIN')[]
}

function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { isLoggedIn, role } = useSelector((state: RootState) => state?.auth)

  if (isLoggedIn && allowedRoles.includes(role!)) {
    return <Outlet />
  } else if (isLoggedIn) {
    return <AccessDenied />
  } else {
    toast.info("Please login to continue ")
    return <Navigate to="/login" replace />
  }
}

export default RequireAuth
