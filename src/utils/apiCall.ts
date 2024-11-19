import { baseUrl } from "@/constants/constants";

interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface ApiResponse {
  products: Product[];
}

export const getAllProducts = async (): Promise<ApiResponse | void> => {
  try {
    const fetchResponse = await fetch(baseUrl());
    if (!fetchResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const data: ApiResponse = await fetchResponse.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message, "error");
    } else {
      console.log("An unknown error occurred", error);
    }
  }
};

export const getAllProductsById = async (
  slug: string
): Promise<Product | null> => {
  try {
    const fetchResponse = await fetch(`https://dummyjson.com/products/${slug}`);

    if (!fetchResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Product = await fetchResponse.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message, "error");
    } else {
      console.log("An unknown error occurred", error);
    }
    return null;
  }
};
