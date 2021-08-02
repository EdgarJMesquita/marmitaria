
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../services/firebase';


type ContextProps = {
  children: ReactNode;
}
type OrdersProps = {
  id: string;
  name: string;
  telephone: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  order: string[];
  status: 'new' | 'shipping';
}
type AdminContextProps = {
  allOrders: OrdersProps[] | undefined;
  newOrders: OrdersProps[] | undefined;
  shippingOrders: OrdersProps[] | undefined;
  getOrderDetails:(id:string)=>OrdersProps | undefined;
  setOrderToShipping:(id:string)=>void;
  endOrder:(id:string)=>void;
}

type FirebaseOrders = Record<string,OrdersProps>;

const AdminContext = createContext({} as AdminContextProps);


function AdminContextProvider({children}:ContextProps){
  const history = useHistory();
  const [ allOrders, setAllOrders] = useState<OrdersProps[]>();
  const [ newOrders, setNewOrders ] = useState<OrdersProps[]>();
  const [ shippingOrders, setShippingOrders ] = useState<OrdersProps[]>();

  

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
      const _newOrders = convertedData.filter(order=>order.status==='new');
      const _shippingOrders = convertedData.filter(order=>order.status==='shipping');
      setAllOrders(convertedData);
      setNewOrders(_newOrders);                                                                                                                                                                                                                                                                                       
      setShippingOrders(_shippingOrders);                                                                                                                                                                                                                                                                                       
      console.log(convertedData);                                                                                                                                                                                                                                                                                                                                                                                         
    })
    return () => {
      ordersRef.off(); 
    }
  }, [])

  function getOrderDetails(id:string){
    const currentOrder = allOrders?.find(order=>order.id===id);
    return currentOrder;
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
      allOrders,
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
