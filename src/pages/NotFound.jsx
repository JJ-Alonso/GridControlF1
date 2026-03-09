import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <h1 className="text-4xl font-black text-red-500">404</h1>
        <p className="mt-3 text-zinc-300">La pagina solicitada no existe.</p>
        <Link to="/" className="inline-block mt-6 rounded-md bg-red-600 px-4 py-2 font-semibold text-black hover:bg-red-500">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
