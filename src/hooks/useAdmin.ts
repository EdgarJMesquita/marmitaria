import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

export function useAdmin(){
  const value = useContext(AdminContext)
  return value;
}
