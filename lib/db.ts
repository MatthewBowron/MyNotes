import supabase from "./supabase";
import { authenticate, signUp, signIn } from "./auth";

const TABLE_NAME = "user_details";

export async function createUser(first_name: string, last_name: string, email: string, password: string ) {
  if (first_name == "" || last_name == "") throw new Error("first and last name cannot be null");
  var user;
  try{
    user = await signIn(email, password);  // check if user token already exists
  }catch(error: any){
    user = await signUp(email, password);
  }
  const { data: result, error } = await supabase.from(TABLE_NAME).insert({uuid:user?.id, first_name, last_name, email}).select().single()
  if (error) throw error
  return result
}

export async function getUser() {
  const user = await authenticate();
  const { data, error } = await supabase.from(TABLE_NAME).select("*").eq("uuid", user.id);
  if (error) throw error;
  return data;
}

export async function updateUser(first_name: string, last_name: string) {
  const user = await authenticate();
  const { data: result, error } = await supabase.from(TABLE_NAME).update({first_name, last_name}).eq('uuid', user.id).select().single()
  if (error) throw error
  return result
}

export async function deleteUser() {
  const user = await authenticate();
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', user.id)
  if (error) throw error
}