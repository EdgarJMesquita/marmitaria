// Components
import { NavBar } from '../../../components/NavBar';
import { OrderItens } from './components/OrderItens';
import { UserAddress } from './components/UserAddress';
import { Container } from '../../../components/Container';
import { Button } from './components/Button';
import { GoBackLink } from '../../../components/GoBackLink';
import { DesktopHeader } from '../../../components/DesktopHeader';
// Customs Hooks
import { useAdmin } from '../../../hooks/useAdmin';

import './style.scss';

type ParamsProps = {
  match:{
    params:{
      orderId:string
    }
  }
}

export function OrderDetails(){
  const { selectedOrder } = useAdmin();
  //const currentOrder = getOrderDetails(orderId); 

  return(
    <Container classname="main">
      <DesktopHeader />
      <Container classname="order-details">
        <GoBackLink />
        <OrderItens itens={selectedOrder?.order}/>
        <UserAddress address={selectedOrder}/>
        <Button orderStatus={selectedOrder?.status} orderId={selectedOrder?.id}/>
      </Container>
      <NavBar />
    </Container>
  )
}