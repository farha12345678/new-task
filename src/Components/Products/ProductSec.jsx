

import './Cards.css'

// import required modules

import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { useLoaderData } from "react-router-dom";


const ProductSec = () => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/product')
      console.log('products', products);
      return res.json()

    }
  })
  // Pagination

  const [currentPage, setCurrentPage] = useState(0);
  const { count } = useLoaderData()
  console.log(count);
  const itemsPerPage = 6;
  const numberOfPages = Math.ceil(count / itemsPerPage)
  console.log(numberOfPages)
  const pages = [...Array(numberOfPages).keys()]

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div>
      <h1>Product Section</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {
          products?.map((p =>
            <div key={p.serial}>
              <div className="border rounded-lg overflow-hidden group">
                <div className="relative">
                  <img
                    src={p.productImage}
                    alt="team"
                    className='h-72 w-full border object-cover rounded-2xl'
                  />
                  <div className="border-b flex gap-3 justify-center p-2 absolute bottom-0 w-full bg-white transition-opacity duration-300 opacity-0 group-hover:opacity-90">
                    <a href="#">a</a>
                    <a href="#">a</a>
                    <a href="#">a</a>
                  </div>
                </div>
                <div className="text-center p-5">
                  <h1 className="text-[#444444] font-semibold text-[20px]">
                    Walter White
                  </h1>
                  <p className="text-[#AAAAAA]">Chief Executive Officer</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <p>Current Page : {currentPage}</p>
      <div className="pagination">
        <button
          className="btn btn-outline btn-accent"
          onClick={handlePrev}>Prev</button>
        {
          pages.map(page =>
            <button
              onClick={() => setCurrentPage(page)}
              key={page}
              className="btn btn-outline btn-accent"
            >{page}</button>

          )
        }
      </div>


    </div>
  );
};

export default ProductSec;