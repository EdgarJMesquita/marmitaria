// Assets
import shippingIcon from '../../assets/images/shippingIcon.svg';
import newOrderIcon from '../../assets/images/newOrderIcon.svg';
import editIcon from '../../assets/images/editIcon.svg';
// Hooks
import { useHistory } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';

import './styles.scss';


export function Footer(){
  const history = useHistory();
  const { newOrders, shippingOrders } = useAdmin();

  return(
    <footer>
      <div onClick={()=>history.push('/admin/new-orders')}>
        <img src={newOrderIcon} alt="novos pedidos" />
        { newOrders && newOrders?.length > 0 && <span>{newOrders?.length}</span>}
      </div>
      <div onClick={()=>history.push('/admin/shipping')} >
        <img src={shippingIcon} alt="pedidos prontos para entrega" />
        { shippingOrders && shippingOrders?.length > 0 && <span>{shippingOrders?.length}</span>}
      </div>
      <div>
        <img src={editIcon} alt="editar cardápio" />
      </div>
    </footer>
  )
}
