// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ProductGrid from './ProductGrid';

const supabase = createClient(
  'https://zywyryijdfdqbzgfuxgd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5d3lyeWlqZGZkcWJ6Z2Z1eGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5ODkzNzIsImV4cCI6MjA0ODU2NTM3Mn0.Z6aL9dy52NtZVty2k--48plX6cA-baxiPZJZoj9ue_Q'
);

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
  
    const categories = ['all', ...new Set(products.map(p => p.category))].sort();
    
    const filteredProducts = selectedCategory === 'all' 
      ? products 
      : products.filter(p => p.category === selectedCategory);
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Fashion Store</h1>
          </div>
        </nav>
  
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
  
          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    );
  };

export default HomePage;