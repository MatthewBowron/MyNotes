import '../polyfills';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function Landing() {
  // 1) Known-good HTTPS
    fetch('https://httpbin.org/status/200')
      .then(r => console.log('[probe] httpbin', r.status))
      .catch(e => console.log('[probe] httpbin failed', e));

    // 2) Supabase Auth health
    fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/auth/v1/health`)
      .then(r => r.text())
      .then(t => console.log('[probe] supabase health', t))
      .catch(e => console.log('[probe] supabase health failed', e));

    // 3) Supabase REST (any public table will 401 but should NOT network-fail)
    fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/`,
      { headers: { apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY! } }
    )
      .then(r => console.log('[probe] rest root', r.status))
      .catch(e => console.log('[probe] rest failed', e));

  
  return (
    


    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyNotes</Text>
      <Text style={styles.subtitle}>Your secure place for smart note taking</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}  onPress={() => router.push('/auth/sign-in')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push('./auth/sign-up')}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF', // Blue tone
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});
