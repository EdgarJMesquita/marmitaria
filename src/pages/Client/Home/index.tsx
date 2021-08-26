// Components
import { Basket } from '../../../components/Basket';
import { Menu } from './Menu';
//Hooks
import { useOrder } from '../../../hooks/useOrder';
import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';

export function Home(){
  const { menu } = useOrder();

  return(
    <>
      <Container classname="main">
        <Header />
        <Menu menu={menu}/>
        <Basket />
      </Container>
    </>
  )
}