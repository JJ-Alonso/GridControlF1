import { api } from "./api"

export async function loginUser(email, password) {
  const users = await api.get(`/users?email=${encodeURIComponent(email.trim().toLowerCase())}`)
  const user = users.find(
    (item) =>
      item.email?.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  )

  return user || null
}
