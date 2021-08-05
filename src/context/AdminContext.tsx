// React Hooks
import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Utils
import { newNotification } from '../utils/newNotification';
// Database Connection
import { database } from '../services/firebase';
// Types
import { ChildrenProps } from '../types/index';
import { conveteAddressToURL } from '../utils/conveteAddressToURL';
import { useAuth } from '../hooks/useAuth';

import Swal from 'sweetalert';

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
  const { userAuth } = useAuth();
  const [ newOrders, setNewOrders ] = useState<AdminOrdersProps[]>();
  const [ shippingOrders, setShippingOrders ] = useState<AdminOrdersProps[]>();

  /* useEffect(()=>{
    if(newOrders && newOrders.length !== 0){
      newNotification(newOrders.length);
    }
  }, [newOrders]) */


  useEffect(() => {

    let isFirstLoad = false;
    const ordersRef = database.ref('orders');

    ordersRef.on('value',snap=>{
      isFirstLoad = true;

      const data:FirebaseOrders = snap.val()?? {};
      const arrayOfOrders:AdminOrdersProps[] = Object.entries(data)?.map(([id,value])=>{
        return{
          ...value,
          encodedAddress: conveteAddressToURL(value),
          id
        }
      });
      
      const _newOrders = arrayOfOrders.filter(({status})=>status==='new');
      const _shippingOrders = arrayOfOrders.filter(({status})=>status==='shipping');
      setNewOrders(_newOrders);                                                                                                                                                                                                                                                                          
      setShippingOrders(_shippingOrders); 

      console.log(arrayOfOrders);                                                                                                                                                                                                                                                                                                                                                                                         
    });

    ordersRef.on('child_added',(snap)=>{
      if(isFirstLoad){
        newNotification();
      }
    });

    return () => {
      ordersRef.off(); 
    }
  }, [userAuth])

  function getOrderDetails(id:string){
    if(newOrders && shippingOrders){
      const allOrders = [...newOrders,...shippingOrders];
      const currentOrder = allOrders.find(order=>order.id === id);
      return currentOrder;
    }
  }

  function setOrderToShipping(id:string){

    database.ref(`orders/${id}`)
    .update({
      status: 'shipping'

    })
    .then(()=>{
      history.push('/admin/new-orders');
      
    })
    .catch(err=>{
      Swal('Algo deu errado', 'Tente novamente', 'error');
      console.log(err);
    })

  }

  function endOrder(id:string){
    database.ref(`orders/${id}`)
    .remove()
    .then(()=>{
      Swal('Pedido entregue com sucesso','','success', { timer:2000 });
      history.push('/admin/shipping');

      })
    .catch(err=>{
      Swal('Algo deu errado','','error', 'Tente novamente');
      console.log(err);
    })
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
