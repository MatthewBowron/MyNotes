import supabase from "./supabase";
import { authenticate } from "./auth";

export type Note = {
  id: string;
  content: string;
  category?: string;
  owner_email?: string;
};

const TABLE = "notes";

export async function listNotes(category?: string) {
  const { data: authData } = await supabase.auth.getUser();
  const email = authData.user?.email;
  if (!email) throw new Error("Not authenticated");

  let q = supabase.from(TABLE).select("*").eq("owner_email", email);
  if (category) q = q.eq("category", category);
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function getNote(id: string) {
  const { data: authData } = await supabase.auth.getUser();
  const email = authData.user?.email;
  if (!email) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .eq("owner_email", email)
    .single();
  if (error) throw error;
  return data;
}

export async function addNote(content: string, category: string) {
  const { data: authData } = await supabase.auth.getUser();
  const email = authData.user?.email;
  if (!email) throw new Error("Not authenticated");

  const payload: any = { content, owner_email: email };
  if (category) payload.category = category;
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateNote(id: string, content: string, category?: string) {
  const { data: authData } = await supabase.auth.getUser();
  const email = authData.user?.email;
  if (!email) throw new Error("Not authenticated");

  const payload: any = { content };
  if (category !== undefined) payload.category = category;
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .eq("owner_email", email)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteNote(id: string) {
  const { data: authData } = await supabase.auth.getUser();
  const email = authData.user?.email;
  if (!email) throw new Error("Not authenticated");

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .eq("owner_email", email);
  if (error) throw error;
}
