import { Container } from '../../../components/Container';
import { Footer } from '../../../components/Footer';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/Orders';

export function NewOrders(){
  const { newOrders } = useAdmin();
  return(
    <>
      <Container classname="">
        <OrdersList title="Novos pedidos" orders={newOrders}/>
      </Container>
      <Footer />
    </>
  )
}