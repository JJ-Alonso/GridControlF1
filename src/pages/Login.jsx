import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { loginUser } from "../services/authService"
import { useAuth } from "../context/useAuth"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const user = await loginUser(values.email, values.password)

      if (!user) {
        toast.error("Credenciales incorrectas")
        return
      }

      login(user)
      toast.success(`Bienvenido ${user.role}`)

      const from = location.state?.from?.pathname
      if (from) {
        navigate(from, { replace: true })
        return
      }

      navigate(user.role === "admin" ? "/admin" : "/perfil", { replace: true })
    } catch (error) {
      toast.error("No se pudo conectar con la API")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-10">
      <div className="mx-auto max-w-5xl grid grid-cols-2 gap-8 max-[767px]:grid-cols-1">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h1 className="text-3xl font-black text-red-500">Acceso a la plataforma</h1>
          <p className="mt-3 text-zinc-300">
            Login con API para separar acceso de usuario y administrador.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="rounded-lg border border-zinc-700 p-3">
              <p className="font-semibold text-red-400">Usuario</p>
              <p className="text-zinc-300">user@test.com / 1234</p>
            </div>
            <div className="rounded-lg border border-zinc-700 p-3">
              <p className="font-semibold text-red-400">Admin</p>
              <p className="text-zinc-300">admin@test.com / 1234</p>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-zinc-300">Email</span>
            <input
              type="email"
              {...register("email", { required: "Introduce un email" })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-zinc-300">Password</span>
            <input
              type="password"
              {...register("password", { required: "Introduce una password" })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
            {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-red-600 px-4 py-2 font-bold text-black hover:bg-red-500 disabled:opacity-60"
          >
            {loading ? "Validando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
