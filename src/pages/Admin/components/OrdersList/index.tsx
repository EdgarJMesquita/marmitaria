// Components
import { OrdersSection } from './OrderSection';
import { OrderPlaceholder } from './Placeholder';
import { Container } from '../../../../components/Container';
// Assets
import './style.scss';
import { OrdersProps } from '../../../../types';

type BananaProps = {
  orders: OrdersProps[] | undefined;
  title: string;
}

export function OrdersList({orders, title}:BananaProps){
  return(
    <Container classname="orders">
     <h1>{title}</h1>
      <ul>
        {orders && <OrdersSection orders={orders}/>}
        {!orders && <OrderPlaceholder />}
      </ul>
    </Container>
  )
}