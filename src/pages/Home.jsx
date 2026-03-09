import { Link } from "react-router-dom"

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950 p-8 max-[510px]:p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Proyecto React + API</p>
        <h1 className="mt-3 text-4xl font-black text-white max-[767px]:text-3xl max-[510px]:text-2xl">
          Plataforma F1 con roles de usuario y admin
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          Navega por coches, guarda favoritos y gestiona el catalogo desde el panel de administracion.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/coches" className="rounded-md bg-red-600 px-4 py-2 font-semibold text-black hover:bg-red-500">
            Ver coches
          </Link>
          <Link to="/login" className="rounded-md border border-zinc-700 px-4 py-2 font-semibold hover:bg-zinc-900">
            Iniciar sesion
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-[990px]:grid-cols-2 max-[767px]:grid-cols-1">
        <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
          <h2 className="font-bold text-red-400">Rutas</h2>
          <p className="mt-2 text-sm text-zinc-300">React Router con rutas publicas y privadas por rol.</p>
        </article>
        <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
          <h2 className="font-bold text-red-400">API</h2>
          <p className="mt-2 text-sm text-zinc-300">Consumo de GET, POST, PUT, PATCH y DELETE mediante servicios.</p>
        </article>
        <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
          <h2 className="font-bold text-red-400">Responsive</h2>
          <p className="mt-2 text-sm text-zinc-300">Breakpoints para 1920, 990, 767, 510 y 480 px.</p>
        </article>
      </div>
    </section>
  )
}
