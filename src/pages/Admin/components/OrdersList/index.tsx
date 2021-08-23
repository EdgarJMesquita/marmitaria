// Components
import { OrdersSection } from './OrderSection';
import { OrderPlaceholder } from './Placeholder';
import { Container } from '../../../../components/Container';
import { OrdersProps } from '../../../../types';
import { OrderDetails } from '../../OrderDetails';
// Assets
import './style.scss';

type BananaProps = {
  orders: OrdersProps[] | undefined;
  title: string;
}

export function OrdersList({orders, title}:BananaProps){
  return(
    <Container classname="orders">
      <div>
        <h1>{title}</h1>
        <ul>
          {orders && <OrdersSection orders={orders}/>}
          {!orders && <OrderPlaceholder />}
        </ul>
      </div>
      <OrderDetails />
    </Container>
  )
}