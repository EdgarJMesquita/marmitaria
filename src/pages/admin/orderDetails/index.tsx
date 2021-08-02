import { Footer } from '../../../components/footer';
import { useAdmin } from '../../../hooks/useAdmin';

type ParamsProps = {
  match:{
    params:{
      orderId:string
    }
  }
}

export function OrderDetails({match}:ParamsProps){
  const { params:{orderId}} = match;  
  const { getOrderDetails, setOrderToShipping, endOrder } = useAdmin();
  const currentOrder = getOrderDetails(orderId); 

  return(
    <div className="orders">

      <h3>Pedido</h3>
      <ul>
        {currentOrder?.order.map((item,index)=>{
          return(
            <li key={index}>1x {item}</li>
            )
          })}
      </ul>
      
      <h3>Endereço</h3>
      <ul>
        <li>{currentOrder?.name}</li>
        <li>{currentOrder?.telephone}</li>
        <li>{currentOrder?.cep}</li>
        <li>{currentOrder?.street}</li>
        <li>{currentOrder?.number}</li>
        <li>{currentOrder?.neighborhood}</li>
      </ul>
      {currentOrder?.status==='new'?(
        <button onClick={()=>setOrderToShipping(orderId)}>Pedido pronto para entrega</button>
        ):(
        <button onClick={()=>endOrder(orderId)}>Pedido entregue</button>
      )}
      <Footer />
    </div>
  )
}