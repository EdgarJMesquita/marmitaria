// Assets
import showDetailsIcon from '../../../assets/images/showDetailsIcon.svg';
// Hooks
import { useHistory } from 'react-router-dom';

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

export function Orders({orders, title}:BananaProps){
  
  return(
    <div className="orders">
     <h3>{title}</h3>
      <ul>
        {orders? 
          <Section order={orders}/>:
          <li>Carregando</li>
        }      
      </ul>
    </div>
  )
}

type Banana = {
  order: OrdersProps[] | undefined;
}

function Section({order}:Banana){
  const history = useHistory();
  return(
   <>
    {(order && order.length > 0)?(
      order.map(order=>{
        return(
          <li key={order?.id}>
           <span>{order?.name}</span>
           <span>{order?.telephone}</span>
           <img onClick={()=>history.push(`/admin/order-details/${order?.id}`)} src={showDetailsIcon} alt="Mostrar detalhes" />
         </li>
       )
        })
     ):(
       <li>Não há pedidos</li>
     ) 
    }
   </>
  )
}