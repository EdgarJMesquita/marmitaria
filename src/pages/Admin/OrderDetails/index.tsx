// Components
import { NavBar } from '../../../components/NavBar';
import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { OrderDetailsList } from './OrderDetailsList';
// Customs Hooks
import './style.scss';



export function OrderDetails(){
  return(
    <Container classname="main">
      <Header />
      <OrderDetailsList />
      <NavBar />
    </Container>
  )
}