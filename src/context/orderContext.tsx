import { createContext, useState, useEffect } from 'react';
//services
import { database } from '../services/firebase';
// types
import { OrderProps, OrderContextProviderProps, ContextProps } from '../types';

const OrderContext = createContext({} as ContextProps);

function OrderContextProvider(props:OrderContextProviderProps){

  const [ order, setOrder] = useState<OrderProps[]>([]);
  const [ menu, setMenu] = useState<OrderProps[]>([]);
  const [ count, setCount] = useState(0);

  useEffect(()=>{
      const updatedOrder = menu.filter(item=>item.isSelected);
      setOrder(updatedOrder);
      setCount(updatedOrder.length);

  },[menu]);

  useEffect(()=>{
    const menuRef = database.ref('menu');
    menuRef.once('value',(snap)=>{
      const data:OrderProps[] = snap.val();
      setMenu(data);
     
    });
  },[]);

  function handleBasket(id:string){
    const updatedOrder = menu.map(item=>item.id===id? {...item, isSelected:!item.isSelected} : {...item});
    setMenu(updatedOrder);
    
  }

  
  return(
    <OrderContext.Provider value={{
      menu,
      order,
      handleBasket,
      count
    }}>
      {props.children}
    </OrderContext.Provider>
  );
}

export { OrderContext , OrderContextProvider}

