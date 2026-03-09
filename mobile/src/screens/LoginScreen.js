import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { loginUser } from "../services/authService"
import { useAuth } from "../context/AuthContext"
import { theme } from "../utils/theme"

export function LoginScreen({ navigation }) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin() {
    try {
      setLoading(true)
      setError("")
      const user = await loginUser(email, password)

      if (!user) {
        setError("Credenciales incorrectas")
        return
      }

      await login(user)
      navigation.navigate("Perfil")
    } catch {
      setError("No se pudo conectar con la API")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesion</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Validando..." : "Entrar"}
        </Text>
      </Pressable>

      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>Credenciales demo</Text>
        <Text style={styles.helpText}>user@test.com / 1234</Text>
        <Text style={styles.helpText}>admin@test.com / 1234</Text>
      </View>
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
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    color: theme.colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  error: {
    color: "#f87171",
    fontSize: 13,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#111",
    fontWeight: "700",
  },
  helpBox: {
    marginTop: 8,
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: 10,
    gap: 4,
  },
  helpTitle: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  helpText: {
    color: theme.colors.textMuted,
  },
})
