import supabase from "./supabase";

export async function signUp(email: string, password: string){
  const {data, error} = await supabase.auth.signUp({email, password});
  if (error) throw error;
  else return data.user;
}

export async function signIn(email: string, password: string){
  const {data, error} = await supabase.auth.signInWithPassword({email, password});
  if (error) throw error;
  else return data.user;
}

export async function signOut(){
  const error = await supabase.auth.signOut();
  if (error) throw error;
}

export async function authenticate() {
  const {data: {user}, error} = await supabase.auth.getUser();
  if (error || !user) throw new Error("User not authenticate")
  return user;
}