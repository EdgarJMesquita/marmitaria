
import { useOrder} from '../../hooks/useOrder';

type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
  type: string;
};

type ItemProps = {
  item: OrderProps;
};

export function MenuItem({item}:ItemProps){
const { handleBasket } = useOrder();
  return(
    <div key={item.id} onClick={()=>handleBasket(item.id)}>
      <img src={item.image} alt={item.id} />
      <p>{item.content}</p>
    </div>
  )
}