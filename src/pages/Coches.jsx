import { useEffect, useMemo, useState } from "react"
import CocheGrid from "../components/coches/CocheGrid"
import { carsService } from "../services/carsService"

export default function Coches() {
  const [busqueda, setBusqueda] = useState("")
  const [coches, setCoches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true)
        const data = await carsService.getAll()
        setCoches(data)
        setError("")
      } catch (err) {
        console.error(err)
        setError("No se pudieron cargar los coches. Comprueba npm run server.")
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [])

  const cochesFiltrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim()

    if (!term) {
      return coches
    }

    return coches.filter(
      (coche) =>
        coche.nombre.toLowerCase().includes(term) ||
        coche.escuderia.toLowerCase().includes(term)
    )
  }, [busqueda, coches])

  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-black text-red-500 max-[510px]:text-2xl">Coleccion de coches F1</h1>

      <input
        type="text"
        placeholder="Buscar por coche o escuderia..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2"
      />

      {loading && <p className="text-zinc-400">Cargando coches...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && <CocheGrid coches={cochesFiltrados} />}
    </section>
  )
}
