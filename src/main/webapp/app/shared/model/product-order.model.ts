import { Moment } from 'moment';
import { IOrderItem } from './order-item.model';
import { IInvoice } from './invoice.model';
import { ICustomer } from './customer.model';

export const enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export interface IProductOrder {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  code?: string;
  orderItems?: IOrderItem[];
  invoices?: IInvoice[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IProductOrder> = {};
