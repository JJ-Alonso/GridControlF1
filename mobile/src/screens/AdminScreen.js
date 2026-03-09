import { useEffect, useState } from "react"
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useAuth } from "../context/AuthContext"
import { carsService } from "../services/carsService"
import { theme } from "../utils/theme"

const EMPTY_FORM = {
  nombre: "",
  escuderia: "",
  año: "2026",
  piloto: "",
  imagen: "",
  tipo: "actual",
}

export function AdminScreen() {
  const { user } = useAuth()
  const [cars, setCars] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState("")

  async function loadCars() {
    try {
      setError("")
      const data = await carsService.getAll()
      setCars(data)
    } catch {
      setError("No se pudo cargar el listado")
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  if (user?.role !== "admin") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Panel Admin</Text>
        <Text style={styles.error}>Acceso denegado para este rol.</Text>
      </View>
    )
  }

  async function handleSave() {
    try {
      const payload = {
        ...form,
        año: Number(form.año),
      }

      if (editingId) {
        await carsService.update(editingId, payload)
      } else {
        await carsService.create(payload)
      }

      setEditingId(null)
      setForm(EMPTY_FORM)
      await loadCars()
    } catch {
      setError("No se pudo guardar el coche")
    }
  }

  async function handleDelete(id) {
    try {
      await carsService.remove(id)
      await loadCars()
    } catch {
      setError("No se pudo eliminar")
    }
  }

  async function handlePatchTipo(car) {
    try {
      const nextTipo = car.tipo === "actual" ? "historico" : "actual"
      await carsService.patch(car.id, { tipo: nextTipo })
      await loadCars()
    } catch {
      setError("No se pudo actualizar tipo")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel Admin</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Nombre"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.input}
          value={form.nombre}
          onChangeText={(value) => setForm((prev) => ({ ...prev, nombre: value }))}
        />
        <TextInput
          placeholder="Escuderia"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.input}
          value={form.escuderia}
          onChangeText={(value) =>
            setForm((prev) => ({ ...prev, escuderia: value }))
          }
        />
        <TextInput
          placeholder="Año"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.input}
          keyboardType="number-pad"
          value={form.año}
          onChangeText={(value) => setForm((prev) => ({ ...prev, año: value }))}
        />
        <TextInput
          placeholder="Pilotos"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.input}
          value={form.piloto}
          onChangeText={(value) => setForm((prev) => ({ ...prev, piloto: value }))}
        />
        <TextInput
          placeholder="Imagen (ruta o URL)"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.input}
          value={form.imagen}
          onChangeText={(value) => setForm((prev) => ({ ...prev, imagen: value }))}
        />
        <TextInput
          placeholder="Tipo (actual/historico)"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.input}
          value={form.tipo}
          onChangeText={(value) => setForm((prev) => ({ ...prev, tipo: value }))}
        />

        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>
              {editingId ? "Guardar (PUT)" : "Crear (POST)"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.buttonSecondary}
            onPress={() => {
              setEditingId(null)
              setForm(EMPTY_FORM)
            }}
          >
            <Text style={styles.buttonSecondaryText}>Limpiar</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={cars}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <Text style={styles.carTitle}>{item.nombre}</Text>
            <Text style={styles.carMeta}>
              {item.escuderia} - {item.año}
            </Text>
            <View style={styles.actions}>
              <Pressable
                style={styles.smallButton}
                onPress={() => {
                  setEditingId(item.id)
                  setForm({
                    nombre: item.nombre,
                    escuderia: item.escuderia,
                    año: String(item.año),
                    piloto: item.piloto,
                    imagen: item.imagen,
                    tipo: item.tipo,
                  })
                }}
              >
                <Text style={styles.smallButtonText}>Editar</Text>
              </Pressable>
              <Pressable
                style={styles.smallButton}
                onPress={() => handlePatchTipo(item)}
              >
                <Text style={styles.smallButtonText}>PATCH tipo</Text>
              </Pressable>
              <Pressable
                style={styles.smallButtonDanger}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.smallButtonDangerText}>DELETE</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: 12,
    gap: 10,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 26,
    fontWeight: "800",
  },
  form: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    padding: 10,
    gap: 8,
  },
  input: {
    backgroundColor: "#111114",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    color: theme.colors.text,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#111",
    fontWeight: "700",
  },
  buttonSecondary: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonSecondaryText: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  error: {
    color: "#f87171",
  },
  carItem: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    gap: 6,
  },
  carTitle: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  carMeta: {
    color: theme.colors.textMuted,
  },
  smallButton: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  smallButtonText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  smallButtonDanger: {
    borderColor: "#ef4444",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  smallButtonDangerText: {
    color: "#f87171",
    fontWeight: "700",
  },
})
