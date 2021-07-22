import { MenuSection } from '../menuSection';

type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
  type: string;
};

type MenuProps = {
  order: OrderProps[];
};

export function Menu({order}:MenuProps){
  return(
    <div className="menu">
        <section>
          <h1>Misturas</h1>
          <MenuSection foodType="misturas" order={order}/>
        </section>
        <section>
          <h1>Guarnições</h1>
          <MenuSection foodType="guarnicoes" order={order}/>          
        </section>
      </div>
  )
}