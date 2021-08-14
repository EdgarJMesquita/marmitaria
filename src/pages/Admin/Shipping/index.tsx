import { Container } from '../../../components/Container';
import { NavBar } from '../../../components/NavBar';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/OrdersList';

export function Shipping(){
  const { shippingOrders } = useAdmin();
  return(
    <Container classname="main admin">
      <OrdersList title="Para entrega" orders={shippingOrders} />
      <NavBar />
    </Container>
  )
}