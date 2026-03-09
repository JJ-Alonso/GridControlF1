import CocheCard from "./CocheCard"

export default function CocheGrid({ coches }) {
  if (coches.length === 0) {
    return <p className="text-zinc-400">No hay resultados para la busqueda actual.</p>
  }

  return (
    <div className="grid grid-cols-4 gap-6 max-[990px]:grid-cols-3 max-[767px]:grid-cols-2 max-[510px]:grid-cols-1 max-[480px]:gap-4">
      {coches.map((coche) => (
        <CocheCard key={coche.id} coche={coche} />
      ))}
    </div>
  )
}
