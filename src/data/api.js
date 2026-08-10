// DummyJSON API service
// Docs: https://dummyjson.com/docs/products

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch all products (paginated, fetches all pages)
 */
export async function fetchAllProducts() {
  const limit = 30;
  let skip = 0;
  let allProducts = [];
  let total = Infinity;

  while (skip < total) {
    const res = await fetch(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}&select=id,title,category,price,thumbnail,images,description,sku,stock,weight,dimensions,discountPercentage,rating,brand`
    );
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    total = data.total;
    allProducts = allProducts.concat(data.products);
    skip += limit;
  }

  return allProducts.map(normalizeProduct);
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}?select=id,title,category,price,thumbnail,images,description,sku,stock,weight,dimensions,discountPercentage,rating,brand`
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.products.map(normalizeProduct);
}

/**
 * Fetch a single product by ID
 */
export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return normalizeProduct(data);
}

/**
 * Search products by query
 */
export async function searchProducts(query) {
  const res = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&select=id,title,category,price,thumbnail,images,description,sku,stock,weight,dimensions,discountPercentage,rating,brand`
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.products.map(normalizeProduct);
}

/**
 * Fetch all category names
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

/**
 * Normalize a DummyJSON product into our store format
 */
function normalizeProduct(p) {
  // Scale prices by 80 to convert DummyJSON's USD to realistic INR
  const scaledPrice = +(p.price * 80).toFixed(2);
  const hasDiscount = p.discountPercentage > 10;
  const discountedPrice = hasDiscount
    ? +(scaledPrice * (1 - p.discountPercentage / 100)).toFixed(2)
    : null;

  const dims = p.dimensions
    ? `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} cm`
    : '—';

  return {
    id: p.id,
    name: p.title,
    category: formatCategoryName(p.category),
    categorySlug: p.category,
    price: scaledPrice,
    sale: hasDiscount,
    salePrice: discountedPrice,
    sku: p.sku || `SKU-${String(p.id).padStart(4, '0')}`,
    stock: p.stock,
    weight: p.weight ? `${p.weight} g` : '—',
    dimensions: dims,
    description: p.description,
    image: p.thumbnail,
    images: p.images || [p.thumbnail],
    rating: p.rating,
    brand: p.brand || '',
  };
}

/**
 * Format "mens-shirts" → "Mens Shirts", "beauty" → "Beauty"
 */
function formatCategoryName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatPrice(price) {
  return '₹' + Number(price).toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
