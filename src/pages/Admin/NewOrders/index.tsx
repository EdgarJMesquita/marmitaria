import { Container } from '../../../components/Container';
import { NavBar } from '../../../components/NavBar';
import { useAdmin } from '../../../hooks/useAdmin';
import { OrdersList } from '../components/Orders';

export function NewOrders(){
  const { newOrders } = useAdmin();
  return(
    <Container classname="main">
      <OrdersList title="Novos pedidos" orders={newOrders}/>
      <NavBar />
    </Container>
  )
}
/* <Container classname="">
        <OrdersList title="Novos pedidos" orders={newOrders}/>
      </Container>
      <Footer /> */