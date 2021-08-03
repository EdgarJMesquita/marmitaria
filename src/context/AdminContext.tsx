// React Hooks
import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Utils
import { newNotification } from '../utils/newNotification';
// Database Connextion
import { database } from '../services/firebase';
// Types
import { ChildrenProps } from '../types/index';
import { encodeAddressURL } from '../utils/encodeAddressURL';

type AdminOrdersProps = {
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
}
type AdminContextProps = {
  newOrders: AdminOrdersProps[] | undefined;
  shippingOrders: AdminOrdersProps[] | undefined;
  getOrderDetails:(id:string)=>AdminOrdersProps | undefined;
  setOrderToShipping:(id:string)=>void;
  endOrder:(id:string)=>void;
}

type FirebaseOrders = Record<string,AdminOrdersProps>;

const AdminContext = createContext({} as AdminContextProps);


function AdminContextProvider({children}:ChildrenProps){
  
  const history = useHistory();
  const [ newOrders, setNewOrders ] = useState<AdminOrdersProps[]>();
  const [ shippingOrders, setShippingOrders ] = useState<AdminOrdersProps[]>();

  useEffect(()=>{
    if(newOrders && newOrders.length !== 0){
      newNotification(newOrders.length);
    }
  }, [newOrders])


  useEffect(() => {
    const ordersRef = database.ref('orders');
    ordersRef.on('value',snap=>{
      const data:FirebaseOrders = snap.val()?? {};
      const convertedData:AdminOrdersProps[] = Object.entries(data)?.map(([id,value])=>{
        const { cep, number, street, neighborhood} = value;
        const encodedAddress = `${number}%2C${encodeAddressURL(street)}%2C${encodeAddressURL(neighborhood)}%2C${cep}`;
        console.log(encodedAddress);
        return{
          ...value,
          encodedAddress,
          id
        }
      });
      
      const _newOrders = convertedData.filter(order=>order.status==='new');
      const _shippingOrders = convertedData.filter(order=>order.status==='shipping');
      setNewOrders(_newOrders);                                                                                                                                                                                                                                                                                       
      setShippingOrders(_shippingOrders); 

      console.log(convertedData);                                                                                                                                                                                                                                                                                                                                                                                         
    })
    return () => {
      ordersRef.off(); 
    }
  }, [])

  function getOrderDetails(id:string){
    if(newOrders && shippingOrders){
      const allOrders = [...newOrders,...shippingOrders];
      const currentOrder = allOrders.find(order=>order.id === id);
      return currentOrder;
    }
  }

  function setOrderToShipping(id:string){
    const orderRef = database.ref(`orders/${id}`);
    orderRef.update({
      status: 'shipping'
    },(err)=>console.log(err));
    history.push('/admin/new-orders');
  }

  function endOrder(id:string){
    const orderRef = database.ref(`orders/${id}`);
    orderRef.remove();
    history.push('/admin/shipping');
  }

  return(
    <AdminContext.Provider value={{
      newOrders,
      shippingOrders,
      getOrderDetails,
      setOrderToShipping,
      endOrder

    }}>
      {children}
    </AdminContext.Provider>
  )
}

export { AdminContext, AdminContextProvider }
