// Components
import { Basket } from '../../components/Basket';
import { Menu } from './Menu';
//Hooks
import { useOrder } from '../../hooks/useOrder';
import { Container } from '../../components/Container';
import { DesktopHeader } from '../../components/DesktopHeader';

export function Home(){
  const { menu } = useOrder();

  return(
    <>
      <Container classname="main">
        <DesktopHeader />
        <Menu menu={menu}/>
        <Basket />
      </Container>
    </>
  )
}