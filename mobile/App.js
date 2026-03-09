import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from "./src/context/AuthContext"
import { FavoritosProvider } from "./src/context/FavoritosContext"
import { AppNavigator } from "./src/navigation/AppNavigator"

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FavoritosProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <AppNavigator />
          </NavigationContainer>
        </FavoritosProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
