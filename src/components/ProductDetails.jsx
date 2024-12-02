// src/components/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import RelatedProducts from './RelatedProducts';

const ProductDetails = () => {
  // Initialize our hooks and state
  const { id } = useParams();  // Get the product ID from the URL
  const navigate = useNavigate();  // Hook for navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data when component mounts or ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Include embedding in the select to use for related products
        const { data, error } = await supabase
          .from('products')
          .select('*, embedding')
          .eq('id', parseInt(id))
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Back to Products
          </button>
          <div className="text-center text-xl text-red-600">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  // If no product is found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Back to Products
          </button>
          <div className="text-center text-xl">Product not found</div>
        </div>
      </div>
    );
  }

  // Main product display
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 mb-6 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        {/* Product details card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product image */}
            <div className="aspect-square relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product information */}
            <div className="space-y-4">
              {/* Product name and price */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description section */}
              <div className="py-4 border-t border-b border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Category section */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Category</h2>
                <p className="text-gray-600 capitalize">{product.category}</p>
              </div>

              {/* Add to cart button */}
              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products section */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
};

export default ProductDetails;