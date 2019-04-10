import { IProduct } from './product.model';

export interface IProductCategory {
  id?: number;
  name?: string;
  description?: string;
  products?: IProduct[];
}

export const defaultValue: Readonly<IProductCategory> = {};
