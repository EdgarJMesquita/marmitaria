import { Container } from '../../../components/Container';
import { Footer } from '../../../components/Footer';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/Orders';

export function Shipping(){
  const { shippingOrders } = useAdmin();
  return(
    <>
      <Container classname="">
        <OrdersList title="Para entrega" orders={shippingOrders} />
      </Container>
      <Footer />
    </>
  )
}