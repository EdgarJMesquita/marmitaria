import { useOrder } from '../../hooks/useOrder';
import { OrderProps } from '../../types';
import closeImg from '../../assets/images/close.svg';
import './styles.scss';

type BananaProps = {
  order: OrderProps[];
}

export function Basket({order}:BananaProps){
  const { handleBasket } = useOrder();

  return(
      <ul>
        { order.map(item=>{
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

/* export function Basket({order}:BananaProps){
  const { handleBasket } = useOrder();
  return(
    <div>
      <ul>
        { order.map(item=>{
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
    </div>
  )
}
 */