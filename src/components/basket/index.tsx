import { useOrder } from '../../hooks/useOrder';
import closeImg from '../../assets/images/close.svg';
import './styles.scss'

type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
  type: string;
}

type BananaProps = {
  order: OrderProps[];
}

export function Basket({order}:BananaProps){
  const { handleBasket } = useOrder();
  return(
    <div>
      {
        order.length > 0 && (
          <ul>
            {
              order.map(item=>{
                if(!item.isSelected) return null;
                  return(
                    <li onClick={()=>handleBasket(item.id)} key={item.id}>
                      <img src={item.image} alt={item.content} />
                      <img className="close" src={closeImg} alt="close" />
                    </li>
                  )
              })
            }
          </ul>
        )
      }
      
    </div>
  )
}