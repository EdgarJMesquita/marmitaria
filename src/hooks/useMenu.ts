import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

export function useMenu(){
  const value = useContext(MenuContext);

  return value;
}