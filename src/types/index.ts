import { ReactNode } from 'react';

export type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
  type: string;
};

export type MenuProps = {
  menu: OrderProps[];
};

export type MenuSectionProps = {
  menu: OrderProps[];
  foodType: string;
};

export type OrderContextProviderProps = {
  children: ReactNode;
}

export type ContextProps = {
  handleBasket: (id:string)=>void;
  clearOrder: ()=>void;
  menu: OrderProps[];
  order: OrderProps[];
  count: number;
}