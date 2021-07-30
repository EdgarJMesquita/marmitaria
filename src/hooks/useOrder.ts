import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

export function useOrder(){
  const value = useContext(OrderContext);

  return value;
}