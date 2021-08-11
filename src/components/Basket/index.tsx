import { BasketItem } from './BasketItem';
import { useOrder } from '../../hooks/useOrder';
import './styles.scss';


export function Basket(){
  const { menu } = useOrder();
  return(
    <ul className="basket">
      { menu.map(item=>{
          return item.isSelected && <BasketItem key={item.id} item={item}/>
        })
      }
    </ul>
  )
}
