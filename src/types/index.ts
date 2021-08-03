import { ReactNode } from 'react';

export type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
  type: string;
};

export type ChildrenProps = {
  children: ReactNode;
}
