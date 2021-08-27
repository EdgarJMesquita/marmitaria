// Assets
import shippingIcon from '../../assets/images/shippingIcon.svg';
import newOrderIcon from '../../assets/images/newOrderIcon.svg';
import editIcon from '../../assets/images/editIcon.svg';
// Hooks
import { useHistory } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
// Components
import './styles.scss';

export function NavBar(){
  const history = useHistory();
  const { newOrders, shippingOrders, selectedPage } = useAdmin();

  return(
    <nav className="navbar">
      
      <div 
        onClick={()=>history.push('/admin/new-orders')} 
        title="Novos pedidos"
      >
        <div>
          <img src={newOrderIcon} alt="novos pedidos" />
          <span>{newOrders? newOrders.length:0}</span>
          {selectedPage === 'new-orders' && <div className="navigation-dot" />}
        </div>
        <p>Novos pedidos</p>
      </div>

      <div 
        onClick={()=>history.push('/admin/shipping')}
        title="Pedidos pronto para entrega"
      >
        <div>
          <img src={shippingIcon} alt="pedidos prontos para entrega" />
          <span>{shippingOrders? shippingOrders.length:0}</span>
          {selectedPage === 'shipping' && <div className="navigation-dot"/>}
        </div>
        <p>Para entrega</p>
      </div>
      
      <div onClick={()=>history.push('/admin/edit-menu')}>
        <div>
          <img src={editIcon} alt="editar cardápio" title="Editar cardápio" />
          {selectedPage === 'edit-menu' && <div className="navigation-dot"/>}
        </div>
        <p>Editar Menu</p>
      </div>

    </nav>
  )
}


/* 
 <nav className="navbar">
      
      <div 
        onClick={()=>history.push('/admin/new-orders')} 
        title="Novos pedidos"
        className={selectedPage === 'new-oselection-dot': ''}>
        <div>
          <img src={newOrderIcon} alt="novos pedidos" />
          <span>{newOrders? newOrders.length:0}</span>
          {selectedPage === 'new-orders' && <div className="selection-dot" />}
        </div>
        <p>Novos pedidos</p>
      </div>

      <div 
        onClick={()=>history.push('/admin/shipping')}
        className={selectedPage === 'shiselection-dot': ''} 
        title="Pedidos pronto para entrega">
        <div>
          <img src={shippingIcon} alt="pedidos prontos para entrega" />
          <span>{shippingOrders? shippingOrders.length:0}</span>
          {selectedPage === 'shipping' && <div className="selection-dot"/>}
        </div>
        <p>Para entrega</p>
      </div>
      
      <div 
        onClick={()=>history.push('/admin/edit-menu')} 
        className={selectedPage === 'editselection-dot': ''}>
        <div>
          <img src={editIcon} alt="editar cardápio" title="Editar cardápio" />
          {selectedPage === 'edit-menu' && <div className="selection-dot"/>}
        </div>
        <p>Editar Menu</p>
      </div>

    </nav> */