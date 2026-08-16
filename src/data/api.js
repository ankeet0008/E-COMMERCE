import LOCAL_PRODUCTS from './products.js';

/**
 * Fetch all products with automatic fallback to Ankit Ki Dukan curated catalog
 */
export async function fetchAllProducts() {
  try {
    return LOCAL_PRODUCTS.map(p => ({
      ...p,
      sale: !!p.sale,
      salePrice: p.salePrice || null,
      rating: p.rating || 4.9,
      brand: p.brand || 'ANKIT KI DUKAN',
      images: p.images || [p.image]
    }));
  } catch (err) {
    console.warn('Error loading products:', err);
    return LOCAL_PRODUCTS;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category) {
  return LOCAL_PRODUCTS.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Fetch a single product by ID
 */
export async function fetchProduct(id) {
  const numId = parseInt(id, 10);
  const found = LOCAL_PRODUCTS.find(p => p.id === numId);
  return found || null;
}

/**
 * Search products by query
 */
export async function searchProducts(query) {
  const q = query.toLowerCase().trim();
  return LOCAL_PRODUCTS.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
  );
}

/**
 * Fetch all category names
 */
export async function fetchCategories() {
  const cats = Array.from(new Set(LOCAL_PRODUCTS.map(p => p.category)));
  return cats;
}

export function formatPrice(price) {
  if (price === undefined || price === null) return '$0.00';
  return (
    '$' +
    Number(price).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}
