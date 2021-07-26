// Components
import { Basket } from '../../components/basket';
import { Menu } from './menu';
//Hooks
import { useOrder } from '../../hooks/useOrder';

export function Home(){
  const { menu, order } = useOrder();

  return(
    <>
      <Menu menu={menu}/>
      <Basket order={order}/>
    </>
  )
}