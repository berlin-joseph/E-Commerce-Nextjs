import { getAllProductsById } from "@/utils/apiCall";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

type Params = Promise<{ slug: string }>;

const ProductPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const data = await getAllProductsById(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Image
            src={data.images[0]}
            alt={data.title}
            height={10000}
            width={10000}
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>

        <div className="lg:w-2/3 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">{data.title}</h1>
          <p className="text-lg text-gray-600">{data.description}</p>

          <div className="flex items-center gap-6">
            <p className="text-3xl font-bold text-green-600">${data.price}</p>
            {data.discountPercentage > 0 && (
              <span className="text-sm text-red-600 font-medium">
                {data.discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="text-md">
                <strong>Category:</strong> {data.category}
              </p>
              <p className="text-md">
                <strong>Brand:</strong> {data.brand}
              </p>
              <p className="text-md">
                <strong>SKU:</strong> {data.sku}
              </p>
            </div>
            <div>
              <p className="text-md">
                <strong>Stock:</strong> {data.stock}
              </p>
              <p className="text-md">
                <strong>Weight:</strong> {data.weight}g
              </p>
              <p className="text-md">
                <strong>Dimensions:</strong>{" "}
                {`Width: ${data.dimensions.width} cm, Height: ${data.dimensions.height} cm, Depth: ${data.dimensions.depth} cm`}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-md text-gray-600">
              <strong>Warranty Information:</strong> {data.warrantyInformation}
            </p>
            <p className="text-md text-gray-600">
              <strong>Shipping Information:</strong> {data.shippingInformation}
            </p>
            <p className="text-md text-gray-600">
              <strong>Availability Status:</strong> {data.availabilityStatus}
            </p>
            <p className="text-md text-gray-600">
              <strong>Return Policy:</strong> {data.returnPolicy}
            </p>
            <p className="text-md text-gray-600">
              <strong>Minimum Order Quantity:</strong>{" "}
              {data.minimumOrderQuantity}
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Customer Reviews
            </h2>
            {data.reviews.length === 0 ? (
              <p className="text-lg text-gray-500">No reviews yet.</p>
            ) : (
              data.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b pb-4 hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-lg text-gray-800">
                      {review.reviewerName}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-500">
                      {[...Array(5)].map((_, starIndex) => (
                        <svg
                          key={starIndex}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            starIndex < review.rating ? "currentColor" : "none"
                          }
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                          strokeWidth="2"
                        >
                          <path d="M12 .587l3.668 7.431L24 9.24l-6 5.85L19.334 24 12 19.78 4.666 24 6 15.09 0 9.24l8.332-.222z" />
                        </svg>
                      ))}
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <em>{new Date(review.date).toLocaleString()}</em>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
