import { Container } from '../../../components/Container';
import { DesktopHeader } from '../../../components/DesktopHeader';
import { NavBar } from '../../../components/NavBar';
import { SideOrderDetails } from '../../../components/SideOrderDetails';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/OrdersList';

export function Shipping(){
  const { shippingOrders } = useAdmin();
  return(
    <Container classname="main">
      <DesktopHeader/>
      <div className="desktop">
        <OrdersList title="Novos pedidos" orders={shippingOrders}/>
        <SideOrderDetails />
      </div>
      <NavBar />
    </Container>
  )
}