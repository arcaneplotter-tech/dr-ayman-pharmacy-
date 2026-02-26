import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Pill, Filter, Download, Upload, FileSpreadsheet } from 'lucide-react';
import { Product, SAMPLE_PRODUCTS } from './data/products';
import { FileUpload } from './components/FileUpload';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import * as XLSX from 'xlsx';

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory ? product.category === activeCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDownloadTemplate = () => {
    const templateData = SAMPLE_PRODUCTS.map(({ id, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "pharma_products_template.csv");
  };

  const handleDataLoaded = (data: Product[]) => {
    setProducts(data);
    setHasLoaded(true);
    setActiveCategory(null);
  };

  const resetApp = () => {
    setHasLoaded(false);
    setProducts([]);
    setCartItems([]);
    setSearchQuery('');
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (!hasLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl space-y-8 text-center"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-2xl mb-4">
              <Pill className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Pharma<span className="text-emerald-600">Shop</span> Importer
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto">
              Upload your pharmaceutical product catalog to instantly generate a searchable e-commerce interface.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <FileUpload onDataLoaded={handleDataLoaded} />
            
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4">Don't have a file? Download our template</p>
              <button
                onClick={handleDownloadTemplate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                Download CSV Template
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetApp}>
            <div className="bg-emerald-600 p-2 rounded-xl text-white">
              <Pill className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Pharma<span className="text-emerald-600">Shop</span>
            </h1>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white border focus:border-emerald-500 rounded-xl transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/standalone.html" 
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700 underline decoration-emerald-300 underline-offset-4 hidden lg:block"
            >
              View Single-File HTML Version
            </a>
            <button
              onClick={resetApp}
              className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium"
              title="Upload New File"
            >
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">Upload New</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-xl transition-colors group"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartTotalItems > 0 && (
                <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  activeCategory === null
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
                )}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    activeCategory === cat
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100"
                      : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Filter className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}
