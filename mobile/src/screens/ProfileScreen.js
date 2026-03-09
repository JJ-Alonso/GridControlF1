import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAuth } from "../context/AuthContext"
import { theme } from "../utils/theme"

export function ProfileScreen({ navigation }) {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Zona de usuario</Text>
        <Text style={styles.info}>Necesitas iniciar sesion para continuar.</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Ir a login</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Rol: {user.role}</Text>

      {user.role === "admin" ? (
        <Pressable style={styles.button} onPress={() => navigation.navigate("Admin")}>
          <Text style={styles.buttonText}>Ir a panel admin</Text>
        </Pressable>
      ) : null}

      <Pressable style={styles.buttonSecondary} onPress={logout}>
        <Text style={styles.buttonSecondaryText}>Cerrar sesion</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: 16,
    gap: 12,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "800",
  },
  info: {
    color: theme.colors.text,
  },
  button: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#111",
    fontWeight: "700",
  },
  buttonSecondary: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: theme.colors.text,
    fontWeight: "700",
  },
})
