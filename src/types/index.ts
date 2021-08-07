import { ReactNode } from 'react';

export type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
  isAvailable: boolean;
  type: string;
};

export type ChildrenProps = {
  children: ReactNode;
}

export type AdminOrdersProps = {
  id: string;
  name: string;
  telephone: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  order: string[];
  status: 'new' | 'shipping';
  encodedAddress: string;
} | undefined;

export type OrdersProps = {
  id: string;
  name: string;
  telephone: string;
  cep: string; 
  street: string;
  number: string;
  neighborhood: string;
  order: string[];
  status: 'new' | 'shipping';
} | undefined;