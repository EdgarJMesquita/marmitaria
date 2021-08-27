import { MenuSection } from '../MenuSection';
import { OrderProps } from '../../../../types';
import { useHistory } from 'react-router';
import Swal from 'sweetalert';
import './style.scss';

export type MenuProps = {
  menu: OrderProps[];
};

export function Menu({menu}:MenuProps){
  const history = useHistory();

  function checkOrder(){
    const selectedItens = menu.filter(({isSelected})=>isSelected);
  
    if(selectedItens.length < 1){
      Swal('Cesta vazia','Escolha seu prato para continuar','info');
      return;
    }
    history.push('/cadastro')
  }

  return(
    <div className="menu">
      <MenuSection title="Misturas" foodType="misturas" menu={menu}/>
      <MenuSection title="Guarnições" foodType="guarnicoes" menu={menu}/>
      {/* <MenuSection title="Bebidas" foodType="guarnicoes" menu={[]}/> */}
      <div className="btn-con">
        <button onClick={checkOrder} >Continuar</button>
      </div>
    </div>
  )
}