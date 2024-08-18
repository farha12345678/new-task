import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './Cards.css'

import { CiStar } from 'react-icons/ci';

const ProductSec = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    // Function to fetch products 
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://new-task-server-2.vercel.app/product', {
                params: { page, size, category, brand, search, sort },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching products');
        }
    };

    // Query to fetch products 
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['products', { page, size, category, brand, search, sort }],
        queryFn: fetchProducts,
        keepPreviousData: true,
        staleTime: 60000,
    });

    if (isLoading) return <div className="text-center"><span className="loading loading-bars loading-lg text-green-500"></span></div>;
    if (isError) return <div>Error: {error.message}</div>;

    const { totalProducts, products } = data || { totalProducts: 0, products: [] };

    return (
        <div className='max-w-[1440px]'>
            <div className='text-center'>
                <h1 className='font-bold text-4xl text-green-600'>Welcome to Trendify</h1>
                <p className='mt-2 font-medium'>Discover a diverse range of high-quality products tailored to meet your needs. <br /> Our intuitive filtering, sorting, and search options make it easy to find exactly what you're looking for, whether it's the latest trends or everyday essentials. <br /> Explore detailed product descriptions, reviews, and seamless navigation to enhance your shopping experience.

                </p>
            </div>

            <div className='lg:flex mt-4 lg:gap-x-10 justify-center items-center'>
                {/* <div className='border'>
               <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
               </div> */}
                {/* search method */}
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text"
                        placeholder="Search With Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
                {/* category filter */}
                <div className=''>
                    <select className='dropdown btn border bg-white' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Watch">Watch</option>
                        <option value="Dress">Dress</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Bag">Bag</option>
                    </select>
                </div>
                {/* Brand filter */}
                <div>
                    <select className='dropdown btn border bg-white' value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="">All Brands</option>
                        <option value="UrbanStep">UrbanStep</option>
                        <option value="SpeedMax">SpeedMax</option>
                        <option value="TrailBlaze">TrailBlaze</option>
                        <option value="HoopMaster">HoopMaster</option>
                        <option value="ZenFit">ZenFit</option>
                    </select>
                </div>
                {/* price filter */}
                <div>
                    <select className='dropdown btn border bg-white' value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Sort By Price & Date</option>
                        <option value="price-asc">Price Low to High</option>
                        <option value="price-desc">Price High to Low</option>
                        <option value="date-new">Newest First</option>
                    </select>
                </div>
            </div>
            {totalProducts === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="grid md:grid-cols-2 mt-10 lg:grid-cols-3 gap-4">
                    {products?.map((product) => (

                        <div key={product.serial} className=" lg:w-96 lg:mx-10 h-[550px] bg-green-100 border border-green-600">
                            <figure><img className='h-56 w-full' src={product.productImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold">
                                    {product.productName}

                                </h2>
                                <p className='text-lg font-medium'>Price: <span>{product.price}</span></p>
                                <p className='text-lg font-medium text-green-700'>{product.description}</p>
                                <p className='text-lg font-medium'>Category: <span>{product.category}</span></p>
                                <div className="flex">
                                    <p className='flex text-xl font-medium'>
                                        <CiStar />
                                        <p>{product.ratings}</p>
                                    </p>
                                    <p className='text-lg font-normal'>Brand Name: <span>{product.brandName}</span></p>
                                </div>
                                <div className="card-actions justify-end">
                                    <p >Posted date & time: <span className=" text-green-700 font-medium mr-4">{product.creationDate}</span>-<span>{product.creationTime}</span></p>

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
