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

export interface ClothSideAttributes extends ModelInstance {
	name: string;
  cloth_base: string;
  cloth_background: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface ColorAttributes {
	id?: number;
  name: string;
	color: string;
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

export interface OrderClothSideAttributes {
  id?: number;
  design_file: string;
  design_width: number;
  design_height: number;
  mockup_file: string;
  order_id?: number;
  cloth_side_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderCountAttributes extends ModelInstance {
  amount: number;
  order_id?: number;
  cloth_id?: number;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  created_at?: Date;
  updated_at?: Date;
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

export interface ModelCollectionResult<T extends ModelInstance> extends ICollectionResult {
  rows: T[],
  count: number;
}