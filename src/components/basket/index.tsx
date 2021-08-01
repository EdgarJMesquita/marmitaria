import { BasketItem } from './basketItem';
import './styles.scss';
import { useOrder } from '../../hooks/useOrder';


export function Basket(){
  const { menu } = useOrder();
  return(
    <ul>
      { menu.map(item=>{
          return item.isSelected && <BasketItem key={item.id} item={item}/>
        })
      }
    </ul>
  )
}
