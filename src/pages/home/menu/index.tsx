import { MenuSection } from '../menuSection';
import { MenuProps } from '../../../types';
import { useHistory } from 'react-router';
import Swal from 'sweetalert';
import './style.scss';

export function Menu({menu}:MenuProps){
  const history = useHistory();

  function checkOrder(){
    const selected = menu.filter(item=>item.isSelected).length;

    if(selected < 1){
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
        <MenuSection title="Misturas" foodType="misturas" menu={menu}/>
        <MenuSection title="Guarnições" foodType="guarnicoes" menu={menu}/>          
        <div className="btn-con">
          <button onClick={checkOrder}>Continuar</button>
        </div>
      </div>
  )
}