import { BasketItem } from './BasketItem';
import { useMenu } from '../../hooks/useMenu';
import './styles.scss';


export function Basket(){
  const { menu } = useMenu();
  return(
    <ul className="basket">
      { menu.map(item=>{
          return item.isSelected && <BasketItem key={item.id} item={item}/>
        })
      }
    </ul>
  )
}
