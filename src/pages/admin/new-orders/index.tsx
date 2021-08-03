import { Footer } from '../../../components/footer';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/orders';

export function NewOrders(){
  const { newOrders } = useAdmin();
  return(
    <>
      <OrdersList title="Novos pedidos" orders={newOrders}/>
      <Footer />
    </>
  )
}