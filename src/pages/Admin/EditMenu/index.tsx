import { NavBar } from "../../../components/NavBar";
import { useOrder } from "../../../hooks/useOrder";
import notAvailableIcon from '../../../assets/images/close.svg';
import availableIcon from '../../../assets/images/selected.svg';
import { useAdmin } from "../../../hooks/useAdmin";
import { Container } from "../../../components/Container";

export function EditMenu(){
  const { menu } = useOrder();
  const { handleMenu, updateMenu } = useAdmin();

  return(
    <Container classname="main">
      <Container classname="orders">
        <h1>Menu</h1>
        <ul>
          {menu.map(item=>{
            return(
              <li onClick={()=>handleMenu(item.id)} key={item.id} className="edit-menu"> 
                {item.isAvailable && <img src={availableIcon} alt="available" />}
                {!item.isAvailable && <img src={notAvailableIcon} alt="not available" />}
                <span>{item.content}</span>
              </li>
              )
            })}
          </ul>
          <button onClick={updateMenu}>Atualizar menu</button>
        </Container>
        <NavBar />
    </Container>
  )
}
/* <Container>
        <Container classname="orders">
          <h3>Cardápio</h3>
          <ul>
          {menu.map(item=>{
            return(
              <li onClick={()=>handleMenu(item.id)} key={item.id} className="edit-menu"> 
                {item.isAvailable && <img src={availableIcon} alt="available" />}
                {!item.isAvailable && <img src={notAvailableIcon} alt="not available" />}
                <span>{item.content}</span>
              </li>
              )
            })}
            <li onClick={updateMenu} className="button">Atualizar menu</li>
          </ul>
        </Container>
      </Container>
      <Footer /> */