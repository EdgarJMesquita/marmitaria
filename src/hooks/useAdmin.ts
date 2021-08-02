/* import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  status: string;
}

type FirebaseOrders = Record<string,OrdersProps>;

export function useAdmin(){
  const history = useHistory();
  const [ orders, setOrders ] = useState<OrdersProps[]>();

  

  useEffect(() => {
    const ordersRef = database.ref('orders');
    ordersRef.on('value',snap=>{
      const data:FirebaseOrders = snap.val()?? {};
      const convertedData:OrdersProps[] = Object.entries(data)?.map(([id,value])=>{
        return{
          ...value,
          id
        }
      });
      setOrders(convertedData);                                                                                                                                                                                                                                                                                       
      console.log(convertedData);                                                                                                                                                                                                                                                                                                                                                                                         
    })
    return () => {
      ordersRef.off(); 
    }
  }, [])

  function getOrderDetails(id:string){
    const currentOrder = orders?.find(order=>order.id===id);
    console.log(currentOrder);
    return currentOrder;
  }

  function setOrderToShipping(id:string){
    const orderRef = database.ref(`orders/${id}`);
    orderRef.update({
      status: 'shipping'
    },(err)=>console.log(err));
  }

  function endOrder(id:string){
    const orderRef = database.ref(`orders/${id}`);
    orderRef.remove();
    history.push('/admin/new-orders');
  }

  return { orders, getOrderDetails, setOrderToShipping, endOrder }
}
 */

import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

export function useAdmin(){
  const value = useContext(AdminContext)
  return value;
}
