import SignInForm from '../../components/SignInForm/sign-in-form';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

export default function SignIn() {
  return (
    <View style={styles.container}>
      <SignInForm />

      <Link href="/signin/sign-up">
        <Text style={styles.signUpText}>
          Don’t have an account? Sign up here →
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

