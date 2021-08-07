
import { MenuItem } from '../MenuItem';
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
        { 
          menu.length > 0?
            ( menu.map(item=>
                item.type===foodType && <MenuItem item={item} key={item.id}/>)
            ):(
              //<p style={{textAlign:'center'}}>Carregando</p>
              <Placeholder />
            ) 
        }

      </div>
    </section>
  )
}

function Placeholder(){
  return(
    <>
      <div className="placeholder">
        <div className="item">

        </div>
        <p>0000000</p>
      </div>
      <div className="placeholder">
        <div className="item">

        </div>
        <p>0000000</p>
      </div>
      <div className="placeholder">
        <div className="item">

        </div>
        <p>0000000</p>
      </div>
      <div className="placeholder">
        <div className="item">

        </div>
        <p>0000000</p>
      </div>
    </>
  )
}