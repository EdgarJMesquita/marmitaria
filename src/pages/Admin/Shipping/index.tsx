import { useEffect } from 'react';
import { OrdersList } from '../../../components/OrdersList';
import { useAdmin } from '../../../hooks/useAdmin';

export function Shipping(){
  const { shippingOrders, setSelectedPage } = useAdmin();

  useEffect(() => {
    let isFirstLoad = true;
    isFirstLoad && setSelectedPage('shipping');
    
    return () => {
      isFirstLoad = false;  
    }
  }, [setSelectedPage]);

  return(
    <OrdersList title="Para entrega" orders={shippingOrders}/>
  )
}