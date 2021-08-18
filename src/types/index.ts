import ModelInstance from "@edgarjeremy/sirius.adapter/dist/libs/ModelInstance";
import { ICollectionResult } from "@edgarjeremy/sirius.adapter/dist/libs/Utility";


export interface AboutAttributes extends ModelInstance {
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ClothAttributes extends ModelInstance {
  name: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface RawClothAttributes {
  id: number;
  name: string;
  price: number;
}

export interface ClothSideAttributes extends ModelInstance {
  name: string;
  cloth_base: string;
  cloth_background: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RawClothSideAttributes {
  id: number;
  name: string;
  cloth_base: string;
  cloth_background: string;
}

export interface ColorAttributes extends ModelInstance {
  name: string;
  color: string;
  cloth_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderAttributes extends ModelInstance {
  name: string;
  email: string;
  phone: string;
  confirmed?: boolean;
  order_number: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderClothSideAttributes extends ModelInstance {
  design_file: string;
  design_width: number;
  design_height: number;
  design_x: number;
  design_y: number;
  mockup_file: string;
  design_rotation: number;
  order_id?: number;
  cloth_side_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface RawOrderClothSideAttributes {
  design_file: File | string;
  design_width: number;
  design_height: number;
  design_x: number;
  design_y: number;
  design_rotation: number;
  mockup_file?: string;
  cloth_side_id?: number;
  cloth_side_name?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderCountAttributes extends ModelInstance {
  amount: number;
  order_id?: number;
  cloth_id?: number;
  size_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface RawOrderCountAttributes {
  amount: number;
  cloth_id: number;
  size: string;
}

export interface PortfolioAttributes extends ModelInstance {
  picture: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserAttributes extends ModelInstance {
  name: string;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SizeAttributes extends ModelInstance {
	size: "S" | "M" | "L" | "XL" | "XXL";
	cloth_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ColorSizeStockAttributes extends ModelInstance {
	stock: number;
	cloth_id?: number;
  size_id?: number;
  color_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ModelCollectionResult<T extends ModelInstance> extends ICollectionResult {
  rows: T[],
  count: number;
}