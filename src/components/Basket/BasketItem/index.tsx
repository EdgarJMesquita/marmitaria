import { OrderProps } from '../../../types';
import closeImg from '../../../assets/images/close.svg';
import { useMenu } from '../../../hooks/useMenu';


type BaskItemProps = {
  item: OrderProps;
}

export function BasketItem({item}:BaskItemProps){
  const { handleBasket } = useMenu();
  return(
    <li onClick={()=>handleBasket(item.id)} key={item.id}>
      <img src={item.image} alt={item.content} />
      <img className="close" src={closeImg} alt="close" />
    </li>
  )
}
