'use server';

import { createClient } from "@/lib/supabase/server";


export async function fetchProducts() {
  const response = await fetch("http://localhost:3000/api/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}