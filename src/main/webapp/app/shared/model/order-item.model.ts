import { IProduct } from './product.model';
import { IProductOrder } from './product-order.model';

export const enum OrderItemStatus {
  AVAILABLE = 'AVAILABLE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  BACK_ORDER = 'BACK_ORDER'
}

export interface IOrderItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  status?: OrderItemStatus;
  product?: IProduct;
  order?: IProductOrder;
}

export const defaultValue: Readonly<IOrderItem> = {};
