export async function GET(request: Request) {
  // Parse query parameters from the request URL
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const name = url.searchParams.get('name');

  // Optional: Type-safe usage
  console.log('ID:', id);
  console.log('Name:', name);

  return new Response(JSON.stringify({ message: 'Received address' }), {
    status: 200,
  });
}