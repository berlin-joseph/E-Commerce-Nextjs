import { getAllProducts } from "@/utils/apiCall";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const data = await getAllProducts();

  if (!data || !data.products)
    return (
      <div className="text-center py-12 text-xl text-gray-600">
        No products found
      </div>
    );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.products.map((product) => (
          <Link href={`${product.id}`} key={product.id}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4">
              <div className="h-60 mb-4">
                <Image
                  src={product?.thumbnail ?? ""}
                  alt={product.title}
                  height={10000}
                  width={10000}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>

              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-green-600">
                  ${product.price}
                </p>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-red-600 bg-red-100 py-1 px-2 rounded-md">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
