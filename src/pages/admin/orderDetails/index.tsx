// Components
import { Footer } from '../../../components/footer';
// Customs Hooks
import { useAdmin } from '../../../hooks/useAdmin';
// Assets
import whatsAppIcon from '../../../assets/images/whatsapp.svg'; 
import googleMapsIcon from '../../../assets/images/googleMapsIcon.svg';

import './style.scss';

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
    <>
    <div className="order-details">

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
        <li>
          {currentOrder?.telephone} 
          <a href={`https://api.whatsapp.com/send?phone=${currentOrder?.telephone}`} rel="noreferrer" target="_blank">
            <img src={whatsAppIcon} alt="chamar no whatsapp" />
          </a>
        </li>
        <li>{currentOrder?.cep}</li>
        <li>{currentOrder?.street}</li>
        <li>{currentOrder?.number}</li>
        <li>{currentOrder?.neighborhood}</li>
      </ul>
      
      <ul>
        <li>
          Abrir Google Maps
          <a href="geo:0,0?q=2010+Rua+Olyntho+Arruda+Sapiranga-Coité">
            <img src={googleMapsIcon} alt="google map" />
          </a>
        </li>
      </ul>
      {currentOrder?.status==='new'?(
        <button onClick={()=>setOrderToShipping(orderId)}>Pedido pronto para entrega</button>
        ):(
        <button onClick={()=>endOrder(orderId)}>Pedido entregue</button>
      )}
    </div>
      <Footer />
    </>
  )
}