import { createClient } from "@supabase/supabase-js";

console.log(process.env.EXPO_PUBLIC_SUPARBASE_URL)

const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPARBASE_URL,
    process.env.EXPO_PUBLIC_SUPARBASE_KEY
);

export default supabase;