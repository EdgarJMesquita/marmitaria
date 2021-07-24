
import { MenuItem } from '../menuItem';
import { MenuSectionProps } from '../../types';

export function MenuSection({ menu, foodType }:MenuSectionProps){
  return(
    <div className="menu-section">
      { menu?(
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