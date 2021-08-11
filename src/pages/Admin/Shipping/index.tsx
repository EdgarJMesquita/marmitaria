import { Container } from '../../../components/Container';
import { NavBar } from '../../../components/NavBar';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/Orders';

export function Shipping(){
  const { shippingOrders } = useAdmin();
  return(
    <Container classname="main">
      <OrdersList title="Para entrega" orders={shippingOrders} />
      <NavBar />
    </Container>
  )
}
/* <Container classname="">
        <OrdersList title="Para entrega" orders={shippingOrders} />
      </Container>
      <Footer /> */