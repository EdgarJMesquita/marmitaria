import { useContext } from 'react';
import { OrderContext } from '../context/orderContext';

export function useOrder(){
  const value = useContext(OrderContext);

  return value;
}