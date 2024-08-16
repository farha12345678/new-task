import './Cards.css';
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from 'react';
import { useLoaderData } from "react-router-dom";

const ProductSec = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 6;
  const { count } = useLoaderData();
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const { isLoading, error, data: products = [] } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: async () => {
      const res = await fetch(`https://new-task-server-mu.vercel.app/product?page=${currentPage}&size=${itemsPerPage}`);
      return res.json();
    },
  });

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products]);

  // Combined filtering and sorting logic
  const sortedAndFilteredProducts = useMemo(() => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter((product) => product.brandName === selectedBrand);
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSort === "price-asc") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "date-new") {
      filteredProducts = filteredProducts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    }

    return filteredProducts;
  }, [products, selectedCategory, selectedBrand, searchQuery, selectedSort]);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;

  return (
    <div>
      <h1>Product Section</h1>

      {/* Filter Options */}
      <div className="my-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Brand Filter */}
        <div>
          <select
            className="select select-bordered w-full"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            <option value="SpeedMax">SpeedMax</option>
            <option value="UrbanStep">UrbanStep</option>
            <option value="TrailBlaze">TrailBlaze</option>
            <option value="HoopMaster">HoopMaster</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            className="select select-bordered w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Options */}
        <div>
          <select
            className="select select-bordered w-full"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="date-new">Date Added: Newest First</option>
          </select>
        </div>

        {/* Search Input */}
        <div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAndFilteredProducts.map((product) => (
          <div key={product.serial}>
            <div className="border rounded-lg overflow-hidden group">
              <div className="relative">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="h-72 w-full border object-cover rounded-2xl"
                />
                <div className="border-b flex gap-3 justify-center p-2 absolute bottom-0 w-full bg-white transition-opacity duration-300 opacity-0 group-hover:opacity-90">
                  <a href="#">a</a>
                  <a href="#">a</a>
                  <a href="#">a</a>
                </div>
              </div>
              <div className="text-center p-5">
                <h1 className="text-[#444444] font-semibold text-[20px]">
                  {product.productName}
                </h1>
                <p className="text-[#AAAAAA]">{product.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn btn-outline btn-accent"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-outline btn-accent ${currentPage === page ? 'selected' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          className="btn btn-outline btn-accent"
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
        >
          Next
        </button>
      </div>

      <p>Current Page: {currentPage}</p>
    </div>
  );
};

export default ProductSec;
