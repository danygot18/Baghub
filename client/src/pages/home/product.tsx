import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ProductType {
  name: string;
  price: number;
  description?: string;
  images?: { url: string }[];
}

interface ProductResponse {
  products: ProductType[];
  resPerPage: number;
  productsCount: number;
  filteredProductsCount: number;
}

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resPerPage, setResPerPage] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [filteredProductsCount, setFilteredProductsCount] = useState<number>(0);
  const [price, setPrice] = useState<[number, number]>([1, 50000]);
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { keyword } = useParams<{ keyword?: string }>();

  const getProducts = async (
    currentPage: number = 1,
    keyword: string = "",
    price: [number, number],
    category: string = ""
  ): Promise<void> => {
    try {
      let link = `${import.meta.env.VITE_API}/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

      if (category) {
        link += `&category=${category}`;
      }

      const res = await axios.get<ProductResponse>(link);

      setProducts(res.data.products);
      setResPerPage(res.data.resPerPage);
      setProductsCount(res.data.productsCount);
      setFilteredProductsCount(res.data.filteredProductsCount);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(error.response?.data?.message || "Failed to load products");
    }
  };

  const totalPages = Math.ceil(productsCount / resPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    getProducts(currentPage, keyword || "", price, category);
  }, [currentPage, keyword, price, category]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Products</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className=" p-4 rounded-lg shadow hover:shadow-lg transition duration-300 bg-white"
              >
                {product.images && product.images[0] && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-700 mt-1">${product.price}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
