// validateSignIn.ts
import { signIn } from "../../lib/auth";
import { Alert } from "react-native";

export default async function validateSignIn(username: string, password: string) {
  try {
    console.log("[validateSignIn] calling signIn…");
    const userData = await signIn(username, password); // <-- this is throwing

    console.log("[validateSignIn] got userData:", userData);
    Alert.alert("Signed in", "Login successful"); // RN alert

    if (userData == null) return false;
    return userData;
  } catch (err: any) {
    console.log("[validateSignIn] error:", err?.message || err);
    Alert.alert("Login failed", err?.message ?? "Network request failed");
    // Decide: return false or rethrow so caller's catch handles it
    return false;
  }
}
