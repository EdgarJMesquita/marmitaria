// Components
import { Basket } from '../../components/Basket';
import { Menu } from './Menu';
//Hooks
import { useOrder } from '../../hooks/useOrder';
import { Container } from '../../components/Container';

export function Home(){
  const { menu } = useOrder();

  return(
    <>
      <Container classname="">
        <Menu menu={menu}/>
      </Container>
      <Basket />
    </>
  )
}
