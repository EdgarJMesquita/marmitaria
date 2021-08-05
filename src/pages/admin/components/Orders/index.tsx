// Assets
import showDetailsIcon from '../../../../assets/images/showDetailsIcon.svg';
// Hooks
import { useHistory } from 'react-router-dom';

import './style.scss';
import { Container } from '../../../../components/Container';

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
        {orders && <Section order={orders}/>}      
        {!orders && <li style={{justifyContent:"center"}}>Carregando</li>}
      </ul>
    </Container>
  )
}


type Banana = {
  order: OrdersProps[];
}

function Section({order}:Banana){
  const history = useHistory();
  return(
   <>
    {order?.length === 0 && <li style={{justifyContent:"center"}}>Não há pedidos</li>}
    {order.map(order=>{
        return(
          <li onClick={()=>history.push(`/admin/order-details/${order?.id}`)}  key={order?.id} title={`Abrir pedido ${order?.name}`} >
           <span>{order?.name}</span>
           <span>{order?.telephone}</span>
           <img onClick={()=>history.push(`/admin/order-details/${order?.id}`)} src={showDetailsIcon} alt="Mostrar detalhes" />
         </li>
       )})}
   </>
  )
}