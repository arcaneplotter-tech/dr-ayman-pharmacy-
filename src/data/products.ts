export interface Product {
  id: string;
  name: string;
  activeIngredient: string;
  company: string;
  price: number;
  description: string;
  category?: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "A-Viton 50000 I.U.",
    activeIngredient: "Vitamin A",
    company: "Kahira",
    price: 19,
    description: "20 Capsules - Vitamin A supplement",
    category: "Vitamins"
  },
  {
    id: "2",
    name: "Aptamil 1 Advance Premium",
    activeIngredient: "Milk Formula Stage 1",
    company: "Nutricia Cuijk B.V.",
    price: 370,
    description: "400gm - Infant milk formula",
    category: "Baby Care"
  },
  {
    id: "3",
    name: "Aptamil 2 Advance Premium",
    activeIngredient: "Milk Formula Stage 2",
    company: "Nutricia Cuijk B.V.",
    price: 370,
    description: "400gm - Follow-on milk formula",
    category: "Baby Care"
  },
  {
    id: "4",
    name: "Abimol 500mg",
    activeIngredient: "Paracetamol",
    company: "GlaxoSmithKline",
    price: 24,
    description: "20 Tablets - Analgesic and Antipyretic",
    category: "Pain Relief"
  },
  {
    id: "5",
    name: "Abimol Extra",
    activeIngredient: "Paracetamol + Caffeine",
    company: "GlaxoSmithKline",
    price: 28,
    description: "20 Tablets - For strong pain relief",
    category: "Pain Relief"
  },
  {
    id: "6",
    name: "Adrenaline",
    activeIngredient: "Adrenaline",
    company: "Misr",
    price: 350,
    description: "1mg/ml 100 Ampoules - Emergency medication",
    category: "Injection"
  },
  {
    id: "7",
    name: "Atacand 16mg",
    activeIngredient: "Candesartan Cilexetil",
    company: "AstraZeneca",
    price: 116,
    description: "14 Tablets - Antihypertensive",
    category: "Cardiovascular"
  },
  {
    id: "8",
    name: "Ator 10mg",
    activeIngredient: "Atorvastatin",
    company: "EIPICO",
    price: 33,
    description: "7 Tablets - Lipid lowering agent",
    category: "Cardiovascular"
  },
  {
    id: "9",
    name: "Augmentin 1g",
    activeIngredient: "Amoxicillin + Clavulanic Acid",
    company: "MUP",
    price: 99,
    description: "14 Tablets - Broad spectrum antibiotic",
    category: "Antibiotics"
  },
  {
    id: "10",
    name: "Betadine Solution",
    activeIngredient: "Povidone Iodine",
    company: "Mundipharma",
    price: 475,
    description: "1 Liter - Antiseptic solution",
    category: "Antiseptics"
  },
  {
    id: "11",
    name: "Brufen 400mg",
    activeIngredient: "Ibuprofen",
    company: "Abbott",
    price: 78,
    description: "30 Tablets - Anti-inflammatory",
    category: "Pain Relief"
  },
  {
    id: "12",
    name: "Cataflam 50mg",
    activeIngredient: "Diclofenac Potassium",
    company: "Novartis",
    price: 86,
    description: "20 Tablets - Pain relief",
    category: "Pain Relief"
  },
  {
    id: "13",
    name: "Concor 5mg",
    activeIngredient: "Bisoprolol",
    company: "Merck",
    price: 63,
    description: "30 Tablets - Beta blocker",
    category: "Cardiovascular"
  },
  {
    id: "14",
    name: "Controloc 40mg",
    activeIngredient: "Pantoprazole",
    company: "Takeda",
    price: 100,
    description: "14 Tablets - Proton pump inhibitor",
    category: "Gastrointestinal"
  },
  {
    id: "15",
    name: "Dolphin 50mg",
    activeIngredient: "Diclofenac Sodium",
    company: "Delta Pharma",
    price: 48,
    description: "10 Suppositories - Anti-inflammatory",
    category: "Pain Relief"
  },
  {
    id: "16",
    name: "Flagyl 500mg",
    activeIngredient: "Metronidazole",
    company: "Sanofi",
    price: 23,
    description: "20 Tablets - Antiprotozoal/Antibacterial",
    category: "Antibiotics"
  },
  {
    id: "17",
    name: "Genuphil",
    activeIngredient: "Glucosamine + Chondroitin",
    company: "Eva Pharma",
    price: 260,
    description: "50 Tablets - Joint care",
    category: "Supplements"
  },
  {
    id: "18",
    name: "Hibiotic 1g",
    activeIngredient: "Amoxicillin + Clavulanic Acid",
    company: "Amoun",
    price: 91,
    description: "14 Tablets - Antibiotic",
    category: "Antibiotics"
  },
  {
    id: "19",
    name: "Ketolgin 50mg",
    activeIngredient: "Ketoprofen",
    company: "Amriya",
    price: 11,
    description: "20 Capsules - Pain relief",
    category: "Pain Relief"
  },
  {
    id: "20",
    name: "Lantus SoloStar",
    activeIngredient: "Insulin Glargine",
    company: "Sanofi",
    price: 1287,
    description: "5 Pens - Long acting insulin",
    category: "Diabetes"
  },
  {
    id: "21",
    name: "Milga",
    activeIngredient: "Benfotiamine + Vit B6 + B12",
    company: "Eva Pharma",
    price: 68,
    description: "40 Tablets - Nerve tonic",
    category: "Vitamins"
  },
  {
    id: "22",
    name: "Neurimax",
    activeIngredient: "Vitamin B Complex",
    company: "Chemipharm",
    price: 54,
    description: "30 Capsules - Vitamin supplement",
    category: "Vitamins"
  },
  {
    id: "23",
    name: "Omega 3 Plus",
    activeIngredient: "Fish Oil + Wheat Germ Oil",
    company: "Sedico",
    price: 135,
    description: "30 Capsules - Dietary supplement",
    category: "Supplements"
  },
  {
    id: "24",
    name: "Panadol Advance",
    activeIngredient: "Paracetamol",
    company: "Alexandria/GSK",
    price: 46,
    description: "24 Tablets - Pain reliever",
    category: "Pain Relief"
  },
  {
    id: "25",
    name: "Royal Jelly 1000mg",
    activeIngredient: "Royal Jelly",
    company: "Pharco",
    price: 88,
    description: "12 Capsules - Dietary supplement",
    category: "Supplements"
  },
  {
    id: "26",
    name: "Telfast 180mg",
    activeIngredient: "Fexofenadine",
    company: "Sanofi",
    price: 144,
    description: "20 Tablets - Antihistamine",
    category: "Allergy"
  },
  {
    id: "27",
    name: "Voltaren 100mg",
    activeIngredient: "Diclofenac Sodium",
    company: "Novartis",
    price: 105,
    description: "10 Suppositories - Anti-inflammatory",
    category: "Pain Relief"
  },
  {
    id: "28",
    name: "Zithromax 500mg",
    activeIngredient: "Azithromycin",
    company: "Pfizer",
    price: 160,
    description: "3 Tablets - Antibiotic",
    category: "Antibiotics"
  },
  {
    id: "29",
    name: "Zyrtec 10mg",
    activeIngredient: "Cetirizine",
    company: "GSK",
    price: 100,
    description: "20 Tablets - Antihistamine",
    category: "Allergy"
  },
  {
    id: "30",
    name: "1,2,3",
    activeIngredient: "Paracetamol + Pseudoephedrine",
    company: "Hikma",
    price: 24,
    description: "20 Tablets - Cold & Flu",
    category: "Cold & Flu"
  }
];
