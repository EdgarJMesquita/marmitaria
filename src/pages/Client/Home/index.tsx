// Components
import { Basket } from '../../../components/Basket';
import { Menu } from './Menu';
//Hooks
import { useMenu } from '../../../hooks/useMenu';
import { Container } from '../../../components/Container';
import { Header } from '../../../components/Header';

export function Home(){
  const { menu } = useMenu();

  return(
    <Container classname="main">
      <Header />
      <Menu menu={menu}/>
      <Basket />  
    </Container>
  )
}