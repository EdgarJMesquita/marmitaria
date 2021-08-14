import { Container } from '../../../components/Container';
import { NavBar } from '../../../components/NavBar';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/OrdersList';

export function NewOrders(){
  const { newOrders } = useAdmin();
  return(
    <Container classname="main">
      <OrdersList title="Novos pedidos" orders={newOrders}/>
      <NavBar />
    </Container>
  )
}