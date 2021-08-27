// Components
import { Basket } from '../../../components/Basket';
import { Menu } from './Menu';
//Hooks
import { useMenu } from '../../../hooks/useMenu';

export function Home(){
  const { menu } = useMenu();

  return(
    <>
      <Menu menu={menu}/>
      <Basket />  
    </>
  )
}