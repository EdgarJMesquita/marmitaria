import { MenuSection } from '../menuSection';
import { MenuProps } from '../../../types';
import { useHistory } from 'react-router';
import './style.scss';
import { useOrder } from '../../../hooks/useOrder';
import Swal from 'sweetalert';

export function Menu({menu}:MenuProps){
  const { order } = useOrder();
  const history = useHistory();

  function checkOrder(){
    if(order.length<1){
      Swal({
        text:'Escolha seu prato para continuar',
        icon: 'info'
      })
      return;
    }
    history.push('/cadastro')
  }

  return(
    <div className="menu">
        <section>
          <h1>Misturas</h1>
          <MenuSection foodType="misturas" menu={menu}/>
        </section>
        <section>
          <h1>Guarnições</h1>
          <MenuSection foodType="guarnicoes" menu={menu}/>          
        </section>
        <div className="btn-con">
          <button onClick={checkOrder}>Continuar</button>
        </div>
      </div>
  )
}