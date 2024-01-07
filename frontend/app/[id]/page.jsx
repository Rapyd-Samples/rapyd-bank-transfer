import React from "react";
import PaymentMethods from "../../components/PaymentMethods";

const getProductDetails = async (id) => {
  const res = await fetch(`http://localhost:3333/products/${id}`);
  const data = await res.json();
  return data;
};

export default async function ProductDetails({ params }) {
  const product = await getProductDetails(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight mb-4">Product Details</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-lg font-semibold">
            <span className="text-green-500">SGD {product.price}</span>
          </div>
          <PaymentMethods productId={params.id} />
        </div>
      </div>
    </div>
  );
}
