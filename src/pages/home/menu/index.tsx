import { MenuSection } from '../menuSection';
import { MenuProps } from '../../../types';
import { useHistory } from 'react-router';
import Swal from 'sweetalert';
import './style.scss';
//import { Button } from '../../../components/button';

export function Menu({menu}:MenuProps){
  const history = useHistory();

  function checkOrder(){
    const selectedItens = menu.filter(item=>item.isSelected).length;
    if(selectedItens < 1){
      Swal('Cesta vazia','Escolha seu prato para continuar','info');
      return;
    }
    history.push('/cadastro')
  }

  return(
    <div className="menu">
        <MenuSection title="Misturas" foodType="misturas" menu={menu}/>
        <MenuSection title="Guarnições" foodType="guarnicoes" menu={menu}/>
        <div className="btn-con">
          <button onClick={checkOrder} >Continuar</button>
        </div>
        {/* <Button clickFunction={checkOrder} text="Continuar" type="button"/> */}
      </div>
  )
}