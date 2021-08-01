
import { MenuItem } from '../menuItem';
import { OrderProps } from '../../../types';
import './style.scss';

type MenuSectionProps = {
  title: string;
  foodType: string;
  menu: OrderProps[];
};

export function MenuSection({ title, menu, foodType }:MenuSectionProps){
  return(
    <section>
      <h1>{title}</h1>
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
    </section>
  )
}