import { OrdersProps } from "../../../../../types";
import { OrderItem } from "../OrderItem";

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