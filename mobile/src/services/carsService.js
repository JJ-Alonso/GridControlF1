import { api } from "./api"

export const carsService = {
  getAll: () => api.get("/coches"),
  getById: (id) => api.get(`/coches/${id}`),
  create: (payload) => api.post("/coches", payload),
  update: (id, payload) => api.put(`/coches/${id}`, payload),
  patch: (id, payload) => api.patch(`/coches/${id}`, payload),
  remove: (id) => api.delete(`/coches/${id}`),
}
