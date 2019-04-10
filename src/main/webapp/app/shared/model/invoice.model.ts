import { Moment } from 'moment';
import { IShipment } from './shipment.model';
import { IProductOrder } from './product-order.model';

export const enum InvoiceStatus {
  PAID = 'PAID',
  ISSUED = 'ISSUED',
  CANCELLED = 'CANCELLED'
}

export const enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  PAYPAL = 'PAYPAL'
}

export interface IInvoice {
  id?: number;
  date?: Moment;
  details?: string;
  status?: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: Moment;
  paymentAmount?: number;
  shipments?: IShipment[];
  order?: IProductOrder;
}

export const defaultValue: Readonly<IInvoice> = {};
