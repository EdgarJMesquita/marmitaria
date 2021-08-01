import { useState, useEffect } from 'react';
import { database } from '../services/firebase';

type OrdersProps = {
  id: string;
  name: string;
  telephone: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  order: string[];
}

type FirebaseOrders = Record<string,OrdersProps>;

export function useAdmin(){
  const [ orders, setOrders ] = useState<OrdersProps[]>();
  useEffect(() => {
    const ordersRef = database.ref('orders');
    ordersRef.on('value',snap=>{
      const data:FirebaseOrders = snap.val();
      const convertedData:OrdersProps[] = Object.entries(data).map(([key,value])=>{
        return{
          key,
          ...value
        }
      });
      setOrders(convertedData);                                                                                                                                                                                                                                                                                       
      console.log(convertedData);                                                                                                                                                                                                                                                                                                                                                                                         
    })
    return () => {
      ordersRef.off(); 
    }
  }, [])

  return { orders }
}

/* import { useContext } from 'react';
import {AdminContext} from '../context/AdminContext';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

export function useAdmin(){
  const value = useContext(AdminContext)
  return value;
} */