'use server';

import { createClient } from "@/lib/supabase/server";


export async function fetchProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw new Error(error.message);
  return data;
}