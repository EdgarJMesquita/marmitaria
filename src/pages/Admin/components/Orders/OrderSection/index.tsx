import { useHistory } from "react-router-dom";
import showDetailsIcon from '../../../../../assets/images/showDetailsIcon.svg';

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

type Banana = {
  order: OrdersProps[];
}

export function OrdersSection({order}:Banana){
  const history = useHistory();
  return(
   <>
    {order?.length === 0 && <li style={{justifyContent:"center"}}>Não há pedidos</li>}
    {order.map(order=>{
        return(
          <li onClick={()=>history.push(`/admin/order-details/${order?.id}`)} key={order?.id} title={`Abrir pedido ${order?.name}`} >
            <span>{order?.name}</span>
            <img src={showDetailsIcon} alt="Mostrar detalhes" />
         </li>
       )})}
   </>
  )
}