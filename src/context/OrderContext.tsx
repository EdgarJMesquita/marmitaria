import { createContext, useState, useEffect } from 'react';
//services
import { database } from '../services/firebase';
// types
import { OrderProps, OrderContextProviderProps, ContextProps } from '../types';

const OrderContext = createContext({} as ContextProps);

function OrderContextProvider(props:OrderContextProviderProps){
  const [ menu, setMenu] = useState<OrderProps[]>([]);

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

  function clearOrder(){
    const emptyOrder = menu.map(item=>({...item, isSelected: false}))
    setMenu(emptyOrder);
  }
  
  return(
    <OrderContext.Provider value={{
      menu,
      handleBasket,
      clearOrder
    }}>
      {props.children}
    </OrderContext.Provider>
  );
}

export { OrderContext , OrderContextProvider}

