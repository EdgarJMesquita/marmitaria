import shippingIcon from '../../assets/images/shippingIcon.svg';
import newOrderIcon from '../../assets/images/newOrderIcon.svg';
import editIcon from '../../assets/images/editIcon.svg';

import { useHistory } from 'react-router-dom';

import './styles.scss';


export function Footer(){
  const history = useHistory();

  return(
    <footer>
      <img onClick={()=>history.push('/admin/new-orders')} src={newOrderIcon} alt="novos pedidos" />
      <img onClick={()=>history.push('/admin/shipping')} src={shippingIcon} alt="pedidos prontos para entrega" />
      <img src={editIcon} alt="editar cardápio" />
    </footer>
  )
}
