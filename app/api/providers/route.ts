import { createClient } from '@/lib/supabase/server';
import { IProvider } from '@/models/provider';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Parse query parameters from the request URL
   try {
    const body = await req.json();
    const provider = body as IProvider;

    // Optional: Type-safe usage
    console.log('Provider name:', provider.firstName);
    console.log('Provider address city:', provider.address.city);

    return new Response(JSON.stringify({ message: 'Received provider' }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }


  // const supabase = await createClient();
  // const { data, error } = await supabase.from('providers').select('*');
  // if (error) throw new Error(error.message);

  // return NextResponse.json(body);
}