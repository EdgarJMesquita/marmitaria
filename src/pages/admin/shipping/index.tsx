import { Footer } from '../../../components/footer';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/orders';

export function Shipping(){
  const { shippingOrders } = useAdmin();
  return(
    <>
      <OrdersList title="Prontos para entrega" orders={shippingOrders} />
      <Footer />
    </>
  )
}