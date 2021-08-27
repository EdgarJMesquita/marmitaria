import { useEffect } from 'react';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../../../components/OrdersList';


export function NewOrders(){
  const { newOrders, setSelectedPage } = useAdmin();

  useEffect(() => {
    let isFirstLoad = true;
    isFirstLoad && setSelectedPage('new-orders');
    
    return () => {
      isFirstLoad = false;  
    }
  }, [setSelectedPage]);

  return(
    <OrdersList title="Novos pedidos" orders={newOrders}/>
  )
}