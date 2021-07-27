import { OrderProps } from '../../../types';
import closeImg from '../../../assets/images/close.svg';
import { useOrder } from '../../../hooks/useOrder';


type BaskItemProps = {
  item: OrderProps;
}

export function BasketItem({item}:BaskItemProps){
  const { handleBasket } = useOrder();
  return(
    <li onClick={()=>handleBasket(item.id)} key={item.id}>
      <img src={item.image} alt={item.content} />
      <img className="close" src={closeImg} alt="close" />
    </li>
  )
}
