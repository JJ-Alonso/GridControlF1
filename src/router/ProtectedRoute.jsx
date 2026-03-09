import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export default function ProtectedRoute({ children, role, roles }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  const allowedRoles = roles ?? (role ? [role] : [])

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/perfil" replace />
  }

  return children
}
