import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_KEY, 
    { auth: {
    storage: AsyncStorage,               // persist session on device
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,           // RN doesn’t use URL callbacks
  }}
);

export default supabase;