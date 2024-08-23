import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // To track if more products are available

  const fetchInfo = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/allproducts?page=${pageNumber}&limit=10`);
      const data = await res.json();

      // Check if there are more products to load
      if (data.length === 0) {
        setHasMore(false); // No more products available
      } else {
        setAllProducts((prevProducts) => {
          // Filter out duplicates
          const existingIds = new Set(prevProducts.map(product => product.id));
          const newProducts = data.filter(product => !existingIds.has(product.id));
          return [...prevProducts, ...newProducts]; // Append new products
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo(page);
  }, [page]);

  const remove_product = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      // Remove product from state
      setAllProducts(allproducts.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  // Handle scroll event to load more products
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className='list-product'>
      <h1>All Product Lists</h1>
      <table className='product-table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Category</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {allproducts.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} className='listproduct-product-icon' width="50px" />
              </td>
              <td>{product.name}</td>
              <td>${product.old_price}</td>
              <td>${product.new_price}</td>
              <td>{product.category}</td>
              <td>
                <img onClick={() => remove_product(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="Remove product" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p className="loading">Loading more products...</p>}
      {!hasMore && <p>No more products to load.</p>}
    </div>
  );
};

export default ListProduct;