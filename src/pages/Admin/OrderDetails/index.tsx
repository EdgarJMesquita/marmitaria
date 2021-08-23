// Components
import { NavBar } from '../../../components/NavBar';
import { Container } from '../../../components/Container';
import { DesktopHeader } from '../../../components/DesktopHeader';
import { OrderDetailsList } from './components/OrderDetailsList';
// Customs Hooks
import './style.scss';



export function OrderDetails(){
  return(
    <Container classname="main">
      <DesktopHeader />
      <OrderDetailsList />
      <NavBar />
    </Container>
  )
}