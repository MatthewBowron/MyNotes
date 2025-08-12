import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { addNote, getNote, updateNote, deleteNote } from "../../../lib/notes";

const COLORS = {
  page: "#e9f7fb",
  header: "#c9f0ff",
  button: "#4dafff",
  buttonText: "#fff",
  inputBg: "#fff",
  inputBorder: "#ccc",
  danger: "#ff3b30",
};

export default function NewNote() {
  const params = useLocalSearchParams<{ id?: string; category?: string }>();
  const id = params.id ? String(params.id) : undefined;

  // New: editable category field (prefilled from params if present)
  const [category, setCategory] = useState(params.category ? String(params.category) : "");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        setLoading(true);
        const note = await getNote(id);
        setContent(note.content ?? "");
        // If note has category, show it; otherwise keep whatever came from params
        if (note.category !== undefined) setCategory(note.category ?? "");
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "Failed to load note");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSave = async () => {
    if (!category.trim()) {
      Alert.alert("Missing category", "Please add a category.");
      return;
    }
    if (!content.trim()) {
      Alert.alert("Empty note", "Please write something.");
      return;
    }

    try {
      setSaving(true);
      if (id) {
        await updateNote(id, content, category);
      } else {
        await addNote(content, category);
      }
      router.back();
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = () => {
    if (!id) return;
    Alert.alert("Delete note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(id);
            router.back();
          } catch (e: any) {
            Alert.alert("Error", e?.message ?? "Failed to delete");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{id ? "Edit Note" : "New Note"}{category ? ` (${category})` : ""}</Text>
        <TouchableOpacity onPress={onSave} disabled={saving || loading}>
          <Text style={[styles.save, (saving || loading) && { opacity: 0.5 }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* New: Category input (required) */}
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Current Classes"
          value={category}
          onChangeText={setCategory}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Write your note..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {id ? (
          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.page },
  header: {
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: COLORS.header,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { fontSize: 20, padding: 6 },
  title: { fontSize: 18, fontWeight: "700" },
  save: { fontSize: 16, fontWeight: "700", color: "#007AFF", padding: 6 },
  body: { flex: 1, padding: 16 },
  label: { fontSize: 12, color: "#666", marginTop: 12 },
  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  textarea: { height: 260 },
  deleteBtn: {
    marginTop: 16,
    backgroundColor: COLORS.danger,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: { color: COLORS.buttonText, fontWeight: "600", fontSize: 16 },
});
