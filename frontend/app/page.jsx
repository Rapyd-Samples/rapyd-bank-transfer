import ProductCard from "../components/ProductCard";

const getProducts = async () => {
  const res = await fetch("http://localhost:3333/products");

  const products = await res.json();

  return products;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight mb-4">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
