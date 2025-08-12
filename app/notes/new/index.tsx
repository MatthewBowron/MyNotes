import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

const COLORS = {
  page: "#e9f7fb",
  header: "#c9f0ff",
  button: "#4dafff",
  buttonText: "#fff",
  inputBg: "#fff",
  inputBorder: "#ccc",
};

export default function NewNote() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title for the note.");
      return;
    }
    // For now, just log the note
    console.log({ title, content });

    Alert.alert("Success", "Note saved (not connected to DB yet).", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Note</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Write your note here..."
        value={content}
        onChangeText={setContent}
        multiline
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#bbb" }]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.page },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  multiline: {
    minHeight: 150,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 0.48,
    backgroundColor: COLORS.button,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: COLORS.buttonText, fontWeight: "600", fontSize: 16 },
});
