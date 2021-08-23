import { useAdmin } from "../../../../../hooks/useAdmin"

interface ButtonProps {
  orderStatus: 'new' | 'shipping' | undefined;
  orderId: string | undefined;
}
export function Button({orderStatus, orderId}:ButtonProps){
  const { setOrderToShipping, endOrder} = useAdmin();

  function handleOrderToShipping(id:string| undefined){
    if(id){
      setOrderToShipping(id)
    }
  }

  function handleEndOrder(id:string| undefined){
    if(id){
      endOrder(id)
    }
  }

  return(
    <>
      {orderStatus==='new'?(
        <button onClick={()=>handleOrderToShipping(orderId)}>Pedido pronto para entrega</button>
        ):(
        <button onClick={()=>handleEndOrder(orderId)}>Pedido entregue</button>
        )}
    </>
  )
}