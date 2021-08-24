import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { NavBar } from '../../../components/NavBar';
import { SideOrderDetails } from '../../../components/SideOrderDetails';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../../../components/OrdersList';
import { useEffect } from 'react';

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
    <Container classname="main">
      <Header/>
      <Container classname="desktop">
        <OrdersList title="Para entrega" orders={shippingOrders}/>
        <SideOrderDetails />
      </Container>
      <NavBar />
    </Container>
  )
}