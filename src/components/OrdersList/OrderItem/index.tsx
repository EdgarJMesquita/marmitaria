import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrdersProps } from "../../../types";
import showDetailsIcon from '../../../assets/images/showDetailsIcon.svg';
import { useAdmin } from "../../../hooks/useAdmin";

type OrderItemProps = {
  order: OrdersProps;
}

export function OrderItem({order}:OrderItemProps){
  const history = useHistory();
  const [ waitime, setWaitTime ] = useState('');
  const { selectOrderToShowDetails } = useAdmin();

  function formatPassedTime(time:number){
    const timePassed = (Date.now() - time) / 1000; // Eliminando os miliseconds
    const days = Math.floor(timePassed / 86400);
    const hours = Math.floor(timePassed % 86400 / 3600);
    const minutes = Math.floor(timePassed % 3600 / 60);
    
    return `${days > 0? days+'d':''} ${hours > 0? hours+'h':''} ${minutes}m`;
  }

  useEffect(() => {
    let mounted = true;
    setWaitTime(formatPassedTime(order.createdAt));

    setInterval(()=>{
      if(!mounted) return;

      setWaitTime(formatPassedTime(order.createdAt));
      
    }, 60000) // 1 minuto intervalo

    return ()=>{
      mounted = false;
    }
  }, [order.createdAt])


  function handleSelectOrder(){
    selectOrderToShowDetails(order.id);
    window.screen.availWidth < 1000 && history.push('/admin/order-details');
  }

  return(
    <li onClick={handleSelectOrder} title={`Abrir pedido ${order?.name}`} >
      <span>{order?.name}</span>
      <span>{waitime}</span>
      <img src={showDetailsIcon} alt="Mostrar detalhes" />
    </li>
  )
}