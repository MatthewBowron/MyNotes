import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function Category() {
  const { category } = useLocalSearchParams<{ category: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{String(category)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.body}>
        <Text>Notes for: {String(category)}</Text>
        {/* Later: Load notes from Supabase */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: "#c9f0ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { fontSize: 20, padding: 6 },
  title: { fontSize: 18, fontWeight: "700" },
  body: { flex: 1, padding: 16 },
});
