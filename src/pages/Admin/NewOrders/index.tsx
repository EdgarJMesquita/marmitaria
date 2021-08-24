import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { NavBar } from '../../../components/NavBar';
import { SideOrderDetails } from '../../../components/SideOrderDetails';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../../../components/OrdersList';
import { useEffect } from 'react';


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
    <Container classname="main">
      <Header />
      <div className="desktop">
        <OrdersList title="Novos pedidos" orders={newOrders}/>
        <SideOrderDetails />
      </div>
      <NavBar />
    </Container>
  )
}