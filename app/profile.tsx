import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Profile() {
  // static data (replace with real later)
  const name = "Alex Johnson";
  const email = "alex.johnson@example.com";
  const notesCount = 5;

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>User Profile</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Info pills */}
      <View style={styles.group}>
        <View style={styles.pill}><Text style={styles.pillText}>Name : {name}</Text></View>
        <View style={{ height: 10 }} />
        <View style={styles.pill}><Text style={styles.pillText}>Email: {email}</Text></View>
        <View style={{ height: 10 }} />
        <View style={styles.pill}><Text style={styles.pillText}>Number of Notes : {notesCount}</Text></View>
      </View>

      {/* Spacer + button */}
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.signOutBtn} onPress={() => router.replace("/landing")}>
        <Text style={{ marginRight: 8 }}>👤</Text>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f7fb", paddingBottom: 20 },
  topbar: {
    height: 60,
    backgroundColor: "#c9f0ff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#b6e7fa",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { fontSize: 14, color: "#2b5876" },
  title: { fontSize: 20, fontWeight: "700", color: "#155e75" },

  group: { marginTop: 16, marginHorizontal: 14 },
  pill: {
    backgroundColor: "#e6fbff",
    borderColor: "#b6e7fa",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  pillText: { fontSize: 14, fontWeight: "500", color: "#123" },

  signOutBtn: {
    alignSelf: "center",
    width: "70%",
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#9bd2ee",
    backgroundColor: "#bfe9fb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signOutText: { fontSize: 16, fontWeight: "700", color: "#0f4c75" },
});
