import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { NavBar } from '../../../components/NavBar';
import { SideOrderDetails } from '../../../components/SideOrderDetails';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../../../components/OrdersList';

export function Shipping(){
  const { shippingOrders } = useAdmin();
  return(
    <Container classname="main">
      <Header/>
      <Container classname="desktop">
        <OrdersList title="Novos pedidos" orders={shippingOrders}/>
        <SideOrderDetails />
      </Container>
      <NavBar />
    </Container>
  )
}