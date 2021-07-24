import { MenuSection } from '../menuSection';
import { MenuProps } from '../../types';
import './style.scss';

export function Menu({menu}:MenuProps){
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
      </div>
  )
}