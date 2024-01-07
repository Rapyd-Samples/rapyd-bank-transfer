import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link
        href={`/${product.id}`}
        className="md:max-w-sm w-full rounded overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:cursor-pointer group h-[36rem]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-2/3 object-cover hover:scale-105 transition-all duration-300"
        />
        <div className="px-6 py-4 h-1/3 overflow-y-auto">
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <p className="text-gray-700 text-sm">{product.description}</p>
          <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 shadow-md group-hover:bg-green-600 transition-all duration-300 mt-8">
            SGD {product.price}
          </span>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
