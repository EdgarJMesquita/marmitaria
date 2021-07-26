
import { MenuItem } from '../menuItem';
import { MenuSectionProps } from '../../../types';
import './style.scss';

export function MenuSection({ menu, foodType }:MenuSectionProps){
  return(
    <div className="menu-section">
      { menu.length>0?(
          menu.map(item=>{
            return(
              item.type===foodType && <MenuItem item={item} key={item.id}/>
            )
          }) 
      ):(
        <p>Carregando</p>
      ) }
    </div>
  )
}