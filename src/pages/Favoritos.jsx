import { useEffect, useMemo, useState } from "react"
import CocheGrid from "../components/coches/CocheGrid"
import { useFavoritos } from "../context/useFavoritos"
import { carsService } from "../services/carsService"

export default function Favoritos() {
  const { favoritos } = useFavoritos()
  const [coches, setCoches] = useState([])

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await carsService.getAll()
        setCoches(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadCars()
  }, [])

  const cochesFavoritos = useMemo(
    () => coches.filter((coche) => favoritos.includes(coche.id)),
    [coches, favoritos]
  )

  if (cochesFavoritos.length === 0) {
    return <p className="text-zinc-400">No tienes coches favoritos todavia.</p>
  }

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-black text-red-500 max-[510px]:text-2xl">Tus coches favoritos</h1>
      <CocheGrid coches={cochesFavoritos} />
    </section>
  )
}
