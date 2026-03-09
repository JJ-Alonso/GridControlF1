import { Pressable, StyleSheet, Text, View, Image } from "react-native"
import { theme } from "../utils/theme"

function toImageUrl(path, apiBaseUrl) {
  if (!path) return null
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  if (!path.startsWith("/")) return `${apiBaseUrl}/${path}`
  return `${apiBaseUrl}${path}`
}

export function CocheCard({
  coche,
  apiBaseUrl,
  isFavorito,
  onToggleFavorito,
  onPress,
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Pressable
        style={styles.favButton}
        onPress={onToggleFavorito}
        hitSlop={10}
      >
        <Text style={[styles.favIcon, isFavorito && styles.favIconActive]}>★</Text>
      </Pressable>

      <Image
        source={{ uri: toImageUrl(coche.imagen, apiBaseUrl) }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{coche.nombre}</Text>
      <Text style={styles.meta}>
        {coche.escuderia} - {coche.año}
      </Text>
      <Text style={styles.metaMuted}>{coche.piloto}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{coche.tipo?.toUpperCase()}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 6,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#0f0f12",
    borderRadius: 8,
  },
  title: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  meta: {
    color: theme.colors.text,
    fontSize: 13,
  },
  metaMuted: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#111",
    fontSize: 11,
    fontWeight: "700",
  },
  favButton: {
    position: "absolute",
    zIndex: 2,
    right: 10,
    top: 10,
  },
  favIcon: {
    color: theme.colors.textMuted,
    fontSize: 22,
  },
  favIconActive: {
    color: theme.colors.warning,
  },
})
