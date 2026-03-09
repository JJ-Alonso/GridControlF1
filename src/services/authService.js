import { api } from "./api"

export async function loginUser(email, password) {
  const users = await api.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  )

  return users[0] || null
}
