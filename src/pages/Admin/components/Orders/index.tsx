// Components
import { OrdersSection } from './OrderSection';
import { OrderPlaceholder } from './Placeholder';
import { Container } from '../../../../components/Container';
// Assets
import './style.scss';

type OrdersProps = {
  id: string;
  name: string;
  telephone: string;
  cep: string; 
  street: string;
  number: string;
  neighborhood: string;
  order: string[];
  status: 'new' | 'shipping';
} | undefined;

type BananaProps = {
  orders: OrdersProps[] | undefined;
  title: string;
}

export function OrdersList({orders, title}:BananaProps){
  return(
    <Container classname="orders">
     <h3>{title}</h3>
      <ul>
        {orders && <OrdersSection order={orders}/>}
        {!orders && <OrderPlaceholder />}
      </ul>
    </Container>
  )
}