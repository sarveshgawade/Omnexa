import type { Product } from "./product.types";

export type Quote = {
  _id?: string; 
  contactPersonName: string;
  companyEmail: string;
  address: string;
  companyName: string;
  mobileNumber: string;
  additionalInfo?: string;
  productId: string; 
  country: string;
  requiredQty: number;
  isUrgent: boolean;
  isCustomPackagingRequired: boolean;
  deliveryLocation: string;
  heardFrom: "Google" | "Friend" | "LinkedIn" | "Advertisement" | "Other" | "Instagram" | "";
  productQuantityType: string ;
  agreeToTerms: boolean;
  productName: string;
  packagingType:
    | "PLASTIC_SHAKER"
    | "CORRUGATED_BOX"
    | "WOODEN_BOX"
    | "PALLET_PACKING"
    | "PLASTIC_PALLET"
    | "FIBC_BAG"
    | "PLASTIC_BAG"
    | "PP_BAG"
    | "THERMOCOL_BOX"
    | "BUBBLE_WRAP"
    | "" ;
  product: string
  createdAt?: string;
  updatedAt?: string;
};

export type QuoteOnProfile = {
  _id: string;
  productId: Product;
  requiredQty: number;
  createdAt: string;
  updatedAt: string;
}


// For rendering with labels:
export const PACKAGING_TYPES =  [
  { value: "PLASTIC_SHAKER", label: "Plastic Shaker" },
  { value: "CORRUGATED_BOX", label: "Corrugated Box" },
  { value: "WOODEN_BOX", label: "Wooden Box" },
  { value: "PALLET_PACKING", label: "Pallet Packing" },
  { value: "PLASTIC_PALLET", label: "Plastic Pallet" },
  { value: "FIBC_BAG", label: "FIBC Bag" },
  { value: "PLASTIC_BAG", label: "Plastic Bag" },
  { value: "PP_BAG", label: "PP Bag" },
  { value: "THERMOCOL_BOX", label: "Thermocol Box" },
  { value: "BUBBLE_WRAP", label: "Bubble Wrap" },
]
