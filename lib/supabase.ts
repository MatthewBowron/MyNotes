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


const check =async ()=>{
  try {
  const r = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`, { method: 'POST' });
  console.log('Auth endpoint reachable?', r.status); // 400/401 is OK (means reachable)
} catch (e) {
  console.log('Cannot reach Supabase URL:', e);
}}


console.log('SUPABASE_URL =', process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log(check())

export default supabase;