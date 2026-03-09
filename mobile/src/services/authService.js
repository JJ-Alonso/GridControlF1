import { api } from "./api"

export async function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  const users = await api.get(`/users?email=${encodeURIComponent(normalizedEmail)}`)

  const user = users.find(
    (item) =>
      item.email?.toLowerCase() === normalizedEmail &&
      item.password === password
  )

  return user || null
}
