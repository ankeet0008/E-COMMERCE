import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAllProducts, fetchProduct as fetchProductApi, fetchCategories } from './api';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products + categories on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [prods, cats] = await Promise.all([
          fetchAllProducts(),
          fetchCategories(),
        ]);
        if (!cancelled) {
          setProducts(prods);
          // Build category stats from products
          const catMap = {};
          prods.forEach(p => {
            if (!catMap[p.category]) {
              catMap[p.category] = { name: p.category, slug: p.categorySlug, count: 0, totalStock: 0 };
            }
            catMap[p.category].count++;
            catMap[p.category].totalStock += p.stock;
          });
          setCategories(Object.values(catMap));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const getProduct = useCallback((id) => {
    return products.find(p => p.id === parseInt(id));
  }, [products]);

  const getProductsByCategory = useCallback((category) => {
    return products.filter(p => p.category === category);
  }, [products]);

  return (
    <ProductsContext.Provider value={{
      products,
      categories,
      loading,
      error,
      getProduct,
      getProductsByCategory,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
}
