// Components
import { Footer } from '../../components/footer';
import { Basket } from '../../components/basket';
import { Menu } from '../../components/menu';

//Hooks
import { useOrder } from '../../hooks/useOrder';

import './style.scss';

export function Home(){
  const { order, count } = useOrder();

  return(
    <>
      <Menu order={order}/>
      <Basket order={order}/>
      <Footer count={count}/>
    </>
  )
}