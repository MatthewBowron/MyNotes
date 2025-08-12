import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

type Item = { id: string; title: string; date: string; kind: "folder" | "note" };

const DATA: Item[] = [
  { id: "current-classes", title: "Current Classes", date: "2025-06-25 8:55 PM", kind: "folder" },
  { id: "past-classes",    title: "Past Classes",    date: "2024-11-12 1:15 PM", kind: "folder" },
  { id: "hobby-notes",     title: "Hobby Notes",     date: "2025-05-22 11:32 AM", kind: "folder" },
  { id: "misc",            title: "Miscellaneous",   date: "2024-08-02 8:22 PM", kind: "folder" },
  { id: "new-notes",       title: "New Notes",       date: "2025-06-22 3:49 PM", kind: "note" },
];

const COLORS = {
  page: "#e9f7fb",
  header: "#c9f0ff",
  subHeader: "#d8f5ff",
  chip: "#e6fbff",
  chipBorder: "#b6e7fa",
  rowBg: "#bfe9fb",
  rowBorder: "#a9d9ef",
};

export default function Dashboard() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [q, setQ] = useState("");

  const list = useMemo(
    () => DATA.filter((x) => x.title.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  const openItem = (item: Item) => {
    if (item.id === "new-notes") {
      router.push("/notes/new"); // ✅ fixed path
    } else {
      router.push({ pathname: "/notes/[category]", params: { category: item.id } });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("'/notes/new/index")} // ✅ fixed path
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.headerIcon}></Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Notes</Text>

        <TouchableOpacity
          onPress={() => router.push("/profile")}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.headerIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={styles.smallIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.breadcrumbWrap}>
          <Text style={styles.breadcrumb}>Home</Text>
        </View>

        <TouchableOpacity
          onPress={() => setShowSearch((s) => !s)}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={styles.smallIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Search notes..."
            value={q}
            onChangeText={setQ}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {q.length > 0 && (
            <TouchableOpacity onPress={() => setQ("")} style={styles.clearBtn}>
              <Text style={{ fontSize: 14 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* List */}
      <ScrollView contentContainerStyle={styles.list}>
        {list.map((item) => (
          <TouchableOpacity key={item.id} style={styles.row} onPress={() => openItem(item)}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>{item.kind === "folder" ? "📁" : "📝"}</Text>
              <Text style={styles.rowTitle}>{item.title}</Text>
            </View>
            <Text style={styles.rowDate}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.page },
  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: COLORS.header,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.chipBorder,
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  headerIcon: { fontSize: 22, padding: 6 },

  toolbar: {
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: COLORS.subHeader,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallIcon: { fontSize: 18, padding: 4 },

  breadcrumbWrap: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.chip,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.chipBorder,
  },
  breadcrumb: { fontSize: 13 },

  searchWrap: {
    position: "relative",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.subHeader,
  },
  searchInput: {
    height: 40,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 36,
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#cfe7ef",
  },
  clearBtn: {
    position: "absolute",
    right: 20,
    top: 16,
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  list: { padding: 12, gap: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.rowBg,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.rowBorder,
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowIcon: { fontSize: 20, marginRight: 10 },
  rowTitle: { fontSize: 16, fontWeight: "600" },
  rowDate: { fontSize: 12, opacity: 0.7 },
});
