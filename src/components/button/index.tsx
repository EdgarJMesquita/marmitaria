import { useOrder } from '../../hooks/useOrder';
import { useHistory } from 'react-router';
import Swal from 'sweetalert';
import './style.scss';

export function Button(){
  const history = useHistory();
  const { menu } = useOrder();

  function checkOrder(){
    const selected = menu.map(item=>item.isSelected).length;
    if(selected < 1 ){
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
