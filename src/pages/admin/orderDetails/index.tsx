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
  const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;

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
          <a href={`https://api.whatsapp.com/send?phone=55${currentOrder?.telephone}`} rel="noreferrer" target="_blank">
            {currentOrder?.telephone} 
            <img src={whatsAppIcon} alt="chamar no whatsapp" />
          </a>
        </li>
        <li>{currentOrder?.cep}</li>
        <li>{currentOrder?.street}</li>
        <li>{currentOrder?.number}</li>
        <li>{currentOrder?.neighborhood}</li>
        
        <li>
          <a href={isAndroid? 
                    `geo:0,0?q=${currentOrder?.encodedAddress}` : 
                    `https://www.google.com/maps/search/${currentOrder?.encodedAddress}`
                  }>
            Abrir Maps
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