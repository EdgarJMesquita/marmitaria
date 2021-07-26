import { useOrder } from '../../hooks/useOrder';
import { useHistory } from 'react-router';
import Swal from 'sweetalert';
import './style.scss';

export function Button(){
  const history = useHistory();
  const { order } = useOrder();

  function checkOrder(){
    if(order.length<1){
      Swal({
        text:'Escolha seu prato para continuar',
        icon: 'info'
      })
      return;
    }
    history.push('/cadastro');
  }

  return(
    <div className="btn-con">
        <button onClick={checkOrder}>Continuar</button>
    </div>
  )
}
