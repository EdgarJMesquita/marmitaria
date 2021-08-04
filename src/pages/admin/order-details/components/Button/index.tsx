import { useAdmin } from "../../../../../hooks/useAdmin"

interface ButtonProps {
  orderStatus: 'new' | 'shipping' | undefined;
  orderId: string;
}
export function Button({orderStatus, orderId}:ButtonProps){
  const { setOrderToShipping, endOrder} = useAdmin();
  return(
    <>
      {orderStatus==='new'?(
        <button onClick={()=>setOrderToShipping(orderId)}>Pedido pronto para entrega</button>
        ):(
        <button onClick={()=>endOrder(orderId)}>Pedido entregue</button>
        )}
    </>
  )
}