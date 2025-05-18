import { fetchProducts } from "./action";

export default async function ProductsPage() {
  const products = await fetchProducts();
  return (
    <main className="p-6">
      {JSON.stringify(products)}
      {/* <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <li key={product.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">₹{product.price}</p>
          </li>
        ))}
      </ul> */}
    </main>
  );
}