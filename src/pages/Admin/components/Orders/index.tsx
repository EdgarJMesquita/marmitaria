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
  createdAt: number;
}

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