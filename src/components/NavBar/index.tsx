// Assets
import shippingIcon from '../../assets/images/shippingIcon.svg';
import newOrderIcon from '../../assets/images/newOrderIcon.svg';
import editIcon from '../../assets/images/editIcon.svg';
// Hooks
import { useHistory } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
// Components
import { Container } from '../Container';
import './styles.scss';
import { useAuth } from '../../hooks/useAuth';


export function NavBar(){
  const history = useHistory();
  const { newOrders, shippingOrders } = useAdmin();
  const { userAuth } = useAuth();

  return(
    <nav className="navbar">
      <div onClick={()=>history.push('/admin/new-orders')} title="Novos pedidos">
        <div>
          <img src={newOrderIcon} alt="novos pedidos" />
          <span>{newOrders?.length}</span>
        </div>
        <p>Novos pedidos</p>
      </div>

      <div onClick={()=>history.push('/admin/shipping')} title="Pedidos pronto para entrega">
        <div>
          <img src={shippingIcon} alt="pedidos prontos para entrega" />
          <span>{shippingOrders?.length}</span>
        </div>
        <p>Para entrega</p>
      </div>
      
      <div onClick={()=>history.push('/admin/edit-menu')}>
        <div>
          <img src={editIcon} alt="editar cardápio" title="Editar cardápio" />
        </div>
        <p>Editar Menu</p>
      </div>
      <div className="admin-image">
        <img src={userAuth?.avatar} alt="avatar" />
        <p>{userAuth?.name}</p>
      </div>
    </nav>
  )
}
