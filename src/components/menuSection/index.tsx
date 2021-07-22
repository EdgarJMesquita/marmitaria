import { MenuItem } from "../menuItem";

type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
  type: string;
};

type MenuSectionProps = {
  order: OrderProps[];
  foodType: string;
};

export function MenuSection({order, foodType}:MenuSectionProps){
  return(
    <div>
      { order?(
          order.map(item=>{
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