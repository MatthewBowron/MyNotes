import { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Alert } from "react-native";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { listNotes, deleteNote, type Note } from "../../lib/notes";

export default function Category() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const categoryName = String(category ?? "");

  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!categoryName) return;
    setLoading(true);
    try {
      const data = await listNotes(categoryName);
      setItems(data);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  useFocusEffect(useCallback(() => {
    load();
    return () => {};
  }, [load]));

  const onAdd = () => {
    router.push({ pathname: "/notes/new", params: { category: categoryName } });
  };
  const onEdit = (id: string) => {
    router.push({ pathname: "/notes/new", params: { id, category: categoryName } });
  };
  const onDelete = (id: string) => {
    Alert.alert("Delete note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          try { await deleteNote(id); await load(); }
          catch (e: any) { Alert.alert("Error", e?.message ?? "Failed to delete"); }
        } 
      },
    ]);
  };

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity style={styles.card} onPress={() => onEdit(item.id)} onLongPress={() => onDelete(item.id)}>
      <Text style={styles.cardContent} numberOfLines={3}>{item.content}</Text>
      <Text style={styles.cardMeta}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
        <TouchableOpacity onPress={onAdd}><Text style={styles.add}>＋</Text></TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(n) => n.id}
        contentContainerStyle={items.length ? undefined : { flexGrow: 1 }}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>No notes yet</Text></View>}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        style={styles.body}
      />
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
  add: { fontSize: 28, padding: 6 },
  body: { flex: 1 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#666" },
  card: { backgroundColor: "#f7f7f7", margin: 12, padding: 12, borderRadius: 12 },
  cardContent: { fontSize: 16 },
  cardMeta: { fontSize: 12, color: "#555", marginTop: 8 },
});
