import { Footer } from '../../../components/footer';
import { useAdmin } from '../../../hooks/useAdmin';
import { Orders } from '../orders';

export function NewOrders(){
  const { newOrders } = useAdmin();
  return(
    <>
      <Orders title="Novos pedidos" orders={newOrders}/>
      <Footer />
    </>
  )
}