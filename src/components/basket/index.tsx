import { BasketItem } from './basketItem';
import { OrderProps } from '../../types';
import './styles.scss';

type BananaProps = {
  order: OrderProps[];
}

export function Basket({order}:BananaProps){
  return(
    <ul>
      { order.map(item=>{
          return item.isSelected && <BasketItem key={item.id} item={item}/>
        })
      }
    </ul>
  )
}
