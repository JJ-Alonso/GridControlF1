import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { carsService } from "../services/carsService"

const EMPTY_VALUES = {
  nombre: "",
  escuderia: "",
  año: 2026,
  piloto: "",
  imagen: "",
  tipo: "actual",
}

export default function Admin() {
  const [coches, setCoches] = useState([])
  const [editingId, setEditingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_VALUES })

  const refreshCars = async () => {
    const data = await carsService.getAll()
    setCoches(data)
  }

  useEffect(() => {
    let ignore = false

    const loadInitialCars = async () => {
      try {
        const data = await carsService.getAll()
        if (!ignore) {
          setCoches(data)
        }
      } catch (error) {
        console.error(error)
        if (!ignore) {
          toast.error("No se pudo cargar el listado")
        }
      }
    }

    loadInitialCars()

    return () => {
      ignore = true
    }
  }, [])

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        año: Number(values.año),
      }

      if (editingId) {
        await carsService.update(editingId, payload)
        toast.success("Coche actualizado")
      } else {
        await carsService.create(payload)
        toast.success("Coche creado")
      }

      setEditingId(null)
      reset(EMPTY_VALUES)
      await refreshCars()
    } catch (error) {
      console.error(error)
      toast.error("Error guardando coche")
    }
  }

  const handleEdit = (coche) => {
    setEditingId(coche.id)
    reset(coche)
  }

  const handleDelete = async (id) => {
    try {
      await carsService.remove(id)
      toast.success("Coche eliminado")
      await refreshCars()
    } catch (error) {
      console.error(error)
      toast.error("Error eliminando coche")
    }
  }

  const toggleTipo = async (coche) => {
    try {
      const nextTipo = coche.tipo === "actual" ? "historico" : "actual"
      await carsService.patch(coche.id, { tipo: nextTipo })
      toast.success("Tipo actualizado con PATCH")
      await refreshCars()
    } catch (error) {
      console.error(error)
      toast.error("No se pudo actualizar el tipo")
    }
  }

  const title = useMemo(
    () => (editingId ? "Editar coche" : "Crear nuevo coche"),
    [editingId]
  )

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-black text-red-500 max-[510px]:text-2xl">Panel de administracion</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>

        <div className="grid grid-cols-2 gap-4 max-[767px]:grid-cols-1">
          <label className="space-y-2">
            <span className="text-sm text-zinc-300">Nombre</span>
            <input {...register("nombre", { required: "Campo obligatorio" })} className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2" />
            {errors.nombre && <p className="text-sm text-red-400">{errors.nombre.message}</p>}
          </label>

          <label className="space-y-2">
            <span className="text-sm text-zinc-300">Escuderia</span>
            <input {...register("escuderia", { required: "Campo obligatorio" })} className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2" />
            {errors.escuderia && <p className="text-sm text-red-400">{errors.escuderia.message}</p>}
          </label>

          <label className="space-y-2">
            <span className="text-sm text-zinc-300">Año</span>
            <input type="number" {...register("año", { required: "Campo obligatorio", min: 1950 })} className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2" />
            {errors.año && <p className="text-sm text-red-400">{errors.año.message}</p>}
          </label>

          <label className="space-y-2">
            <span className="text-sm text-zinc-300">Tipo</span>
            <select {...register("tipo")} className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2">
              <option value="actual">Actual</option>
              <option value="historico">Historico</option>
            </select>
          </label>

          <label className="space-y-2 col-span-2 max-[767px]:col-span-1">
            <span className="text-sm text-zinc-300">Pilotos</span>
            <input {...register("piloto", { required: "Campo obligatorio" })} className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2" />
            {errors.piloto && <p className="text-sm text-red-400">{errors.piloto.message}</p>}
          </label>

          <label className="space-y-2 col-span-2 max-[767px]:col-span-1">
            <span className="text-sm text-zinc-300">Imagen (ruta)</span>
            <input {...register("imagen", { required: "Campo obligatorio" })} className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2" />
            {errors.imagen && <p className="text-sm text-red-400">{errors.imagen.message}</p>}
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={isSubmitting} className="rounded-md bg-red-600 px-4 py-2 font-bold text-black hover:bg-red-500 disabled:opacity-60">
            {editingId ? "Guardar cambios" : "Crear coche"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              reset(EMPTY_VALUES)
            }}
            className="rounded-md border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          >
            Limpiar
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Listado actual</h2>
        <div className="grid grid-cols-3 gap-4 max-[990px]:grid-cols-2 max-[767px]:grid-cols-1">
          {coches.map((coche) => (
            <article key={coche.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
              <div>
                <p className="font-bold text-red-400">{coche.nombre}</p>
                <p className="text-sm text-zinc-300">{coche.escuderia} - {coche.año}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => handleEdit(coche)} className="rounded-md border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800">
                  Editar
                </button>
                <button type="button" onClick={() => toggleTipo(coche)} className="rounded-md border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800">
                  PATCH tipo
                </button>
                <button type="button" onClick={() => handleDelete(coche.id)} className="rounded-md border border-red-700 px-3 py-1 text-sm text-red-400 hover:bg-red-900/40">
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
