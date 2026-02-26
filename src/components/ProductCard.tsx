import { Product } from '../data/products';
import { ShoppingCart, Plus, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full"
    >
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {product.category || "Medicine"}
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono">
            {product.price.toFixed(2)} <span className="text-xs text-slate-500 font-sans">EGP</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-1 leading-tight group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="text-xs text-slate-500 mb-4 font-medium">
          {product.company}
        </div>

        <div className="mt-auto space-y-3">
          <div className="bg-slate-50 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
              <Info className="w-3 h-3 text-blue-500" />
              Active Ingredient
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">
              {product.activeIngredient}
            </p>
          </div>

          <div className="text-sm text-slate-500 line-clamp-2">
            {product.description}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={() => onAddToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white py-2.5 rounded-xl transition-colors duration-200 font-medium text-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};
