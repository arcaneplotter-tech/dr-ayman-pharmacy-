import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface FileUploadProps {
  onDataLoaded: (data: Product[]) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processData = (rawData: any[]) => {
    try {
      // Try to map columns intelligently
      // We look for common headers
      if (rawData.length === 0) throw new Error("File is empty");

      const headers = Object.keys(rawData[0]).map(h => h.toLowerCase());
      
      // Helper to find key
      const findKey = (keywords: string[]) => {
        return Object.keys(rawData[0]).find(key => 
          keywords.some(k => key.toLowerCase().includes(k))
        );
      };

      const nameKey = findKey(['name', 'item', 'product', 'الاسم']);
      const activeKey = findKey(['active', 'ingredient', 'composition', 'effect', 'المادة الفعالة']);
      const companyKey = findKey(['company', 'manufacturer', 'الشركة']);
      const priceKey = findKey(['price', 'cost', 'السعر']);
      const descKey = findKey(['desc', 'form', 'dosage', 'type', 'description']);

      if (!nameKey || !priceKey) {
        throw new Error("Could not find required columns: Name and Price");
      }

      const products: Product[] = rawData.map((row, index) => ({
        id: `imported-${index}-${Date.now()}`,
        name: row[nameKey] || "Unknown Product",
        activeIngredient: activeKey ? row[activeKey] : "N/A",
        company: companyKey ? row[companyKey] : "Unknown Company",
        price: parseFloat(row[priceKey]) || 0,
        description: descKey ? row[descKey] : (row[nameKey] || ""),
        category: "Imported"
      })).filter(p => p.name && p.price > 0); // Basic validation

      if (products.length === 0) throw new Error("No valid products found");

      setSuccess(`Successfully loaded ${products.length} products`);
      onDataLoaded(products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (file.name.endsWith('.csv')) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            processData(results.data);
          },
          error: (err) => {
            setError(`CSV Error: ${err.message}`);
            setIsLoading(false);
          }
        });
      } else if (file.name.match(/\.(xlsx|xls)$/)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            processData(json);
          } catch (err) {
            setError("Failed to read Excel file");
            setIsLoading(false);
          }
        };
        reader.readAsBinaryString(file);
      } else {
        setError("Unsupported file format. Please use CSV or Excel.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center cursor-pointer",
          isDragging ? "border-emerald-500 bg-emerald-50/50" : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50",
          isLoading && "opacity-50 pointer-events-none"
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Upload Product List
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Drag & drop your CSV or Excel file here, or click to browse
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Supports .csv, .xlsx, .xls</span>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 -bottom-16 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 -bottom-16 p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
