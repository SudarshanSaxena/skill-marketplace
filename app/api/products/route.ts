import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Parse query parameters from the request URL
  const { searchParams } = new URL(req.url);
  // Example: Get a specific param, e.g., category
  const category = searchParams.get('category');

  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw new Error(error.message);

  return NextResponse.json(data);
}