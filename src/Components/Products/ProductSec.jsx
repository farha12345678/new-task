import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './Cards.css'

const ProductSec = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    // Function to fetch products with the provided parameters
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product', {
                params: { page, size, category, brand, search, sort },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching products');
        }
    };

    // Query to fetch products using react-query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['products', { page, size, category, brand, search, sort }],
        queryFn: fetchProducts,
        keepPreviousData: true, // Keep previous data while loading new data
        staleTime: 60000, // Cache data for 1 minute
    });

    if (isLoading) return <div className="text-center"><span className="loading loading-bars loading-lg text-green-500"></span></div>;
    if (isError) return <div>Error: {error.message}</div>;

    const { totalProducts, products } = data || { totalProducts: 0, products: [] };

    return (
        <div>
            <h1>Products</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Watch">Watch</option>
                    <option value="Dress">Dress</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Bag">Bag</option>
                </select>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">All Brands</option>
                    <option value="UrbanStep">UrbanStep</option>
                    <option value="SpeedMax">SpeedMax</option>
                    <option value="TrailBlaze">TrailBlaze</option>
                    <option value="HoopMaster">HoopMaster</option>
                    <option value="ZenFit">ZenFit</option>
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="date-new">Newest First</option>
                </select>
            </div>
            {totalProducts === 0 ? (
                <p>No products found</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products?.map((product) => (
               
             <div key={product.serial} className=" lg:w-96 lg:mx-10 h-[500px] bg-green-100 border border-green-600">
             <figure><img className='h-56 w-full' src={product.productImage} alt="Shoes" /></figure>
             <div className="card-body">
                 <h2 className="card-title text-xl font-bold">
                     {product.productName}
                     
                 </h2>
                 <p className='text-lg font-medium'>Price: <span>{product.price}</span></p>
                 <p className='text-lg font-medium text-green-700'>{product.description}</p>
                 <p className='text-lg font-medium'>Category: <span>{product.category}</span></p>
                 <div className="card-actions justify-end">
                    <p className=" text-green-700 font-medium" >{product.ratings}</p>
                    <p><span>{product.brandName}</span></p>
                 </div>
             </div>
         </div>
              ))}
            </div>
            )}
            <div className='pagination'>
                <button
                className='btn btn-outline btn-success'
                    disabled={page === 0}
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                >
                    Previous
                </button>
                <span className='text-xl font-bold'> Page {page + 1} </span>
                <button
                className='btn btn-outline btn-success'
                    disabled={products.length < size}
                    onClick={() => setPage((old) => old + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductSec;
