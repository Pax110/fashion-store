// src/components/RelatedProducts.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!currentProduct?.id || !currentProduct?.embedding) return;

      try {
        const { data, error } = await supabase.rpc(
          'get_similar_products',
          { 
            p_id: currentProduct.id,
            p_embedding: currentProduct.embedding
          }
        );

        if (error) throw error;
        setRelatedProducts(data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct]);

  if (loading) return <div className="text-center py-4">Loading related products...</div>;
  
  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer group"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg mb-2">
              <img
                src={product.image_url}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <h3 className="font-medium text-gray-800 group-hover:text-black">
              {product.name}
            </h3>
            <p className="text-gray-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;