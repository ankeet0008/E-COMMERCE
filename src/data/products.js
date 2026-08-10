// Product data store — 20 products across 6 categories
const PRODUCTS = [
  // HARDWARE
  { id: 1, name: 'Adjustable Wrench Set', category: 'Hardware', price: 1840, sku: 'HW-0117', stock: 34, dimensions: '28 × 8 × 4 cm', weight: '1.2 kg', description: 'Drop-forged carbon steel, chrome finish. Three sizes — 6″, 8″, and 10″ — with precision-milled jaws. The kind of wrench set that outlasts the toolbox you keep it in.', image: '/images/wrench-set.svg' },
  { id: 2, name: 'Carbide Drill Bit Kit', category: 'Hardware', price: 2260, sku: 'HW-0243', stock: 18, dimensions: '22 × 12 × 3 cm', weight: '0.6 kg', description: 'Fifteen carbide-tipped bits in a birch case. Cuts through masonry, tile, and hardwood without flinching. Hex shank fits any standard chuck.', image: '/images/drill-bits.svg' },
  { id: 3, name: 'Folding Utility Knife', category: 'Hardware', price: 780, sku: 'HW-0089', stock: 61, dimensions: '11 × 3 × 1.5 cm', weight: '0.14 kg', description: 'Brass-riveted walnut handle, quick-change blade mechanism. Locks open, locks closed, fits a back pocket. Accepts all standard trapezoidal blades.', image: '/images/utility-knife.svg' },
  { id: 4, name: 'Brass Padlock', category: 'Hardware', price: 620, sku: 'HW-0301', stock: 45, dimensions: '6 × 4 × 2 cm', weight: '0.22 kg', description: 'Solid brass body, hardened steel shackle, two keys included. Weather-resistant and built for sheds, gates, and anything worth locking up.', image: '/images/padlock.svg' },

  // KITCHEN
  { id: 5, name: 'Cast Iron Skillet', category: 'Kitchen', price: 3490, sku: 'KT-0056', stock: 22, dimensions: '30 × 30 × 5 cm', weight: '3.4 kg', description: 'Pre-seasoned, single-pour spout, 12-inch cooking surface. Goes from stovetop to oven to campfire. Gets better with every meal.', image: '/images/cast-iron.svg' },
  { id: 6, name: 'Ceramic Nesting Bowls', category: 'Kitchen', price: 2180, sku: 'KT-0112', stock: 15, dimensions: '24 × 24 × 14 cm', weight: '2.1 kg', description: 'Set of four hand-glazed stoneware bowls in graduated sizes. Matte exterior, glossy interior. Microwave and dishwasher safe.', image: '/images/ceramic-bowls.svg' },
  { id: 7, name: 'Linen Napkin Set', category: 'Kitchen', price: 940, sku: 'KT-0178', stock: 38, dimensions: '45 × 45 cm each', weight: '0.3 kg', description: 'Six stonewashed linen napkins in natural flax. Pre-washed for softness, finished edges, and the kind of casual elegance that a paper towel cannot provide.', image: '/images/linen-napkins.svg', sale: true, salePrice: 720 },

  // STATIONERY
  { id: 8, name: 'Field Notebook (3-Pack)', category: 'Stationery', price: 560, sku: 'ST-0034', stock: 87, dimensions: '14 × 9 × 1 cm', weight: '0.18 kg', description: 'Saddle-stitched, 48 pages each, 70gsm graph paper. Water-resistant kraft cover. Fits shirt pockets and back jeans pockets equally well.', image: '/images/field-notebook.svg' },
  { id: 9, name: 'Brass Rollerball Pen', category: 'Stationery', price: 1420, sku: 'ST-0091', stock: 29, dimensions: '14 × 1.2 cm', weight: '0.06 kg', description: 'Solid brass barrel, develops a unique patina over time. Smooth rollerball tip, takes standard international refills. Weighted for comfortable extended writing.', image: '/images/brass-pen.svg' },
  { id: 10, name: 'Wooden Stamp Set', category: 'Stationery', price: 890, sku: 'ST-0145', stock: 42, dimensions: '18 × 12 × 4 cm', weight: '0.4 kg', description: 'Twelve beechwood-handled rubber stamps — numbers, arrows, check marks, and common symbols. Comes in a cloth-lined box.', image: '/images/stamp-set.svg' },

  // APOTHECARY
  { id: 11, name: 'Working Hands Salve', category: 'Apothecary', price: 480, sku: 'AP-0023', stock: 54, dimensions: '7 × 7 × 3 cm', weight: '0.12 kg', description: 'Beeswax and lanolin base with rosemary and tea tree. For hands that have done something today. Tin travels well.', image: '/images/hand-salve.svg' },
  { id: 12, name: 'Cedarwood Beard Oil', category: 'Apothecary', price: 720, sku: 'AP-0067', stock: 31, dimensions: '10 × 3 × 3 cm', weight: '0.08 kg', description: 'Jojoba and argan carrier oils with cedarwood and black pepper essential oils. Amber glass dropper bottle, 30ml.', image: '/images/beard-oil.svg' },
  { id: 13, name: 'Lavender Linen Spray', category: 'Apothecary', price: 540, sku: 'AP-0089', stock: 26, dimensions: '18 × 5 × 5 cm', weight: '0.28 kg', description: 'Distilled lavender hydrosol with a touch of bergamot. For pillows, wardrobes, and any room that needs calming down. 200ml glass bottle.', image: '/images/linen-spray.svg', sale: true, salePrice: 420 },

  // TEXTILES
  { id: 14, name: 'Wool Camp Blanket', category: 'Textiles', price: 4820, sku: 'TX-0012', stock: 11, dimensions: '200 × 150 cm', weight: '1.8 kg', description: 'New Zealand wool, twill weave, whip-stitched edges. Warm enough for autumn evenings, handsome enough for the living room. Dry clean only.', image: '/images/wool-blanket.svg' },
  { id: 15, name: 'Canvas Market Tote', category: 'Textiles', price: 1260, sku: 'TX-0058', stock: 44, dimensions: '42 × 38 × 14 cm', weight: '0.5 kg', description: '18oz waxed canvas, leather-reinforced handles, copper rivets at stress points. Carries groceries, books, and everything in between.', image: '/images/canvas-tote.svg' },
  { id: 16, name: 'Shop Apron', category: 'Textiles', price: 1680, sku: 'TX-0073', stock: 19, dimensions: 'One size', weight: '0.6 kg', description: 'Selvedge denim with adjustable leather neck strap and waist ties. Three pockets: one chest, two hip. For cooking, woodworking, or looking the part.', image: '/images/shop-apron.svg' },

  // OUTDOOR
  { id: 17, name: 'Brass Pocket Compass', category: 'Outdoor', price: 920, sku: 'OD-0019', stock: 37, dimensions: '5 × 5 × 2 cm', weight: '0.1 kg', description: 'Solid brass case with flip lid, luminous dial markings, liquid-dampened needle. Finds north reliably, looks good doing it.', image: '/images/compass.svg' },
  { id: 18, name: 'Speckled Enamel Mug', category: 'Outdoor', price: 380, sku: 'OD-0045', stock: 72, dimensions: '9 × 9 × 8 cm', weight: '0.18 kg', description: 'Steel core, porcelain enamel coating, rolled rim. 350ml. Suitable for campfires, stovetops, and early mornings anywhere.', image: '/images/enamel-mug.svg' },
  { id: 19, name: 'Ferro Rod Fire Starter', category: 'Outdoor', price: 440, sku: 'OD-0078', stock: 53, dimensions: '12 × 1.5 cm', weight: '0.08 kg', description: 'Ferrocerium rod with rosewood handle and braided leather lanyard. Produces 3,000°C sparks in any weather. Good for approximately 12,000 strikes.', image: '/images/fire-starter.svg' },
  { id: 20, name: 'Trail Map Bandana', category: 'Outdoor', price: 320, sku: 'OD-0102', stock: 66, dimensions: '55 × 55 cm', weight: '0.04 kg', description: 'Cotton voile bandana printed with a topographic trail map. Useful as a handkerchief, headband, napkin, or actual rough navigation aid.', image: '/images/bandana.svg', sale: true, salePrice: 240 },
];

export default PRODUCTS;

// Derived category data
export const CATEGORIES = (() => {
  const map = {};
  PRODUCTS.forEach(p => {
    if (!map[p.category]) map[p.category] = { name: p.category, count: 0, totalStock: 0 };
    map[p.category].count++;
    map[p.category].totalStock += p.stock;
  });
  return Object.values(map);
})();

export function getProduct(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

export function formatPrice(price) {
  return '₹ ' + price.toLocaleString('en-IN');
}
