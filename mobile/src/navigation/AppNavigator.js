import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "../context/AuthContext"
import { HomeScreen } from "../screens/HomeScreen"
import { CarsScreen } from "../screens/CarsScreen"
import { CarDetailScreen } from "../screens/CarDetailScreen"
import { FavoritesScreen } from "../screens/FavoritesScreen"
import { ProfileScreen } from "../screens/ProfileScreen"
import { LoginScreen } from "../screens/LoginScreen"
import { AdminScreen } from "../screens/AdminScreen"
import { theme } from "../utils/theme"

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

function TabsNavigator() {
  const { isAuthenticated } = useAuth()

  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        tabBarStyle: { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen name="Inicio" component={HomeScreen} />
      <Tabs.Screen name="Coches" component={CarsScreen} />
      <Tabs.Screen name="Favoritos" component={FavoritesScreen} />
      <Tabs.Screen
        name={isAuthenticated ? "Perfil" : "Login"}
        component={isAuthenticated ? ProfileScreen : LoginScreen}
      />
    </Tabs.Navigator>
  )
}

export function AppNavigator() {
  const { hydrating } = useAuth()

  if (hydrating) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={theme.colors.primary} />
        <Text style={styles.text}>Cargando sesion...</Text>
      </View>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: theme.colors.bg },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CocheDetalle"
        component={CarDetailScreen}
        options={{ title: "Detalle del coche" }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg,
    gap: 8,
  },
  text: {
    color: theme.colors.textMuted,
  },
})
