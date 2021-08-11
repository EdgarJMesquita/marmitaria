// Components
import { NavBar } from '../../../components/NavBar';
import { OrderItens } from './components/OrderItens';
import { UserAddress } from './components/UserAddress';
import { Container } from '../../../components/Container';
import { Button } from './components/Button';
import { GoBackLink } from '../../../components/GoBackLink';
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

export function OrderDetails({match}:ParamsProps){
  const { params:{orderId}} = match;  
  const { getOrderDetails } = useAdmin();
  const currentOrder = getOrderDetails(orderId); 

  return(
    <Container classname="main">
      <Container classname="order-details">
        <GoBackLink />
        <OrderItens itens={currentOrder?.order}/>
        <UserAddress address={currentOrder}/>
        <Button orderStatus={currentOrder?.status} orderId={orderId}/>
      </Container>
      <NavBar />
    </Container>
  )
}