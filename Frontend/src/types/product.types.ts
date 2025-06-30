export type ProductType = 'AGRO' | 'NONAGRO';
export type QuantityType = 'KG' | 'LTR' | 'NOS';

export interface ProductImage {
  public_id?: string;
  secure_url?: string;
}

export interface Product {
  _id?: string;
  productName: string;
  productType: ProductType;
  productQuantityType: QuantityType;
  productForm: string;
  productDescription: string;
  nutrientContent?: string[]; 
  isOrganic: boolean;
  keyFeatures: string[];
  applications: string[];
  productImages?: ProductImage[];
  productThumbnail?: ProductImage;
  isPremium: boolean;
  createdAt?: string;
  updatedAt?: string;
  productShelfLife: string;
  __v?: number;
}
