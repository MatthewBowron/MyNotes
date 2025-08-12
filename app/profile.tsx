import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import supabase from "../lib/supabase";

type UserDetails = { first_name?: string; last_name?: string; email: string };

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [notesCount, setNotesCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const { data: authData, error: authErr } = await supabase.auth.getUser();
        if (authErr) throw authErr;
        const email = authData.user?.email;
        if (!email) throw new Error("Not authenticated");

        // fetch name/email from user_details
        const { data: profile, error: pErr } = await supabase
          .from("user_details")
          .select("first_name,last_name,email")
          .eq("email", email)
          .single();
        if (pErr && pErr.code !== "PGRST116") throw pErr; // ignore 'no rows' error

        setUser({
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          email: email,
        });

        // count notes for this user
        const { count, error: cErr } = await supabase
          .from("notes")
          .select("*", { count: "exact", head: true })
          .eq("owner_email", email);
        if (cErr) throw cErr;

        setNotesCount(count ?? 0);
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const displayName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
    : "Unnamed User";

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.body}>
          <View style={styles.card}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{displayName}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email ?? "-"}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.value}>{notesCount}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f7fb" },
  topbar: {
    height: 56,
    backgroundColor: "#c9f0ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  back: { fontSize: 16 },
  title: { fontSize: 18, fontWeight: "700" },
  body: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#cfd8dc",
  },
  label: { fontSize: 12, color: "#607d8b" },
  value: { fontSize: 16, fontWeight: "600", marginTop: 4 },
});
