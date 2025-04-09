export type TBicycle = {
  name: string;
  brand: string;
  model: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  image?: string;
};
