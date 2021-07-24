// Components
import { Footer } from '../../components/footer';
import { Basket } from '../../components/basket';
import { Menu } from '../../components/menu';
//Hooks
import { useOrder } from '../../hooks/useOrder';

export function Home(){
  const { menu, order } = useOrder();

  return(
    <>
      <Menu menu={menu}/>
      <Basket order={order}/>
      <Footer />
    </>
  )
}