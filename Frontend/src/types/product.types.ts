export type ProductType = 'AGRO' | 'NONAGRO';
export type QuantityType = 'KG' | 'LTR' | 'NOS' | 'TONS';
export type PackagingType = 'PLASTIC_SHAKER' | 'CORRUGATED_BOX' | 'WOODEN_BOX' | 'PALLET_PACKING' | 'PLASTIC_PALLET' | 'FIBC_BAG' | 'PLASTIC_BAG' | 'PP_BAG' | 'THERMOCOL_BOX' | 'BUBBLE_WRAP';

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
