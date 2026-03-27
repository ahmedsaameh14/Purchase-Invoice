import { Product, Supplier } from '../Models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  { code: 'P001', name: 'A4 Paper (Box)', unitPrice: 280 },
  { code: 'P002', name: 'Office Chair', unitPrice: 2500 },
  { code: 'P003', name: 'Gel Pens (12pk)', unitPrice: 120 },
  { code: 'P004', name: 'Desk Organizer', unitPrice: 350 },
  { code: 'P005', name: 'Keyboard', unitPrice: 950 },
  { code: 'P006', name: 'Notebook A5', unitPrice: 95 },
  { code: 'P007', name: 'Stapler', unitPrice: 210 },
  { code: 'P008', name: 'LED Desk Lamp', unitPrice: 450 },
  { code: 'P009', name: 'USB-C Dock', unitPrice: 1200 },
  { code: 'P010', name: 'Whiteboard Markers', unitPrice: 180 }
];

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 1, name: 'Modern Office Solutions' },
  { id: 2, name: 'Global Stationery Wholesale' },
  { id: 3, name: 'Corporate Furniture Group' },
  { id: 4, name: 'Elite Paper Industries' },
  { id: 5, name: 'Tech & Desk Essentials' },
  { id: 6, name: 'Cairo Business Supplies' },
  { id: 7, name: 'Smart Workspace Partners' },
  { id: 8, name: 'Universal Printing Co.' }
];