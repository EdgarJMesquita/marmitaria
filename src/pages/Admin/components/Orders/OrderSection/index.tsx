import { useEffect, useState } from "react";
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
  createdAt: number;
};

type Banana = {
  orders: OrdersProps[];
}


export function OrdersSection({orders}:Banana){
  return(
   <>
    {orders?.length === 0 && <li style={{justifyContent:"center"}}>Não há pedidos</li>}
    {orders.map(order=> <OrderItem order={order} key={order?.id}/>)}
   </>
  )
}

/*  <li onClick={()=>history.push(`/admin/order-details/${order?.id}`)} key={order?.id} title={`Abrir pedido ${order?.name}`} >
            <span>{order?.name}</span>
            <span>{order?.telephone}</span>
            <img src={showDetailsIcon} alt="Mostrar detalhes" />
          </li> */


type OrderItemProps = {
  order: OrdersProps;
}

function OrderItem({order}:OrderItemProps){
  const history = useHistory();
  const [ waitime, setWaitTime ] = useState('');

  function formatPassedTime(time:number){
    const timePassed = (Date.now() - time) / 1000; // Eliminando os miliseconds
    const hours = Math.floor(timePassed / 3600);
    const minutes = Math.floor(timePassed % 3600 / 60);
    return `${hours > 0? hours+'h':''} ${minutes}m`;
  }

  useEffect(() => {
    let mounted = true;
    setWaitTime(formatPassedTime(order.createdAt));

    setInterval(()=>{
      if(!mounted) return;

      setWaitTime(formatPassedTime(order.createdAt));
      
    }, 60000 /*1 minuto*/)

    return ()=>{
      mounted = false;
    }
  }, [order.createdAt])

  return(
    <li onClick={()=>history.push(`/admin/order-details/${order?.id}`)} key={order?.id} title={`Abrir pedido ${order?.name}`} >
      <span>{order?.name}</span>
      <span>{waitime}</span>
      <img src={showDetailsIcon} alt="Mostrar detalhes" />
    </li>
  )
}