import selectedIcon from '../../../assets/images/selected.svg';
import { useOrder} from '../../../hooks/useOrder';
import { OrderProps } from '../../../types';
import './style.scss';

type ItemProps = {
  item: OrderProps;
};

export function MenuItem({item}:ItemProps){
const { handleBasket } = useOrder();
  return(
    <div className="menu-item" onClick={()=>handleBasket(item.id)}>
      <img src={item.image} alt={item.content} />
      {item.isSelected && <img className="selected" src={selectedIcon} alt="checked" />}
      <p>{item.content}</p>
    </div>
  )
}