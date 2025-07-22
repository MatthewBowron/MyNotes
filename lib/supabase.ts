import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPARBASE_URL,
    process.env.EXPO_PUBLIC_SUPARBASE_KEY
);

export default supabase;