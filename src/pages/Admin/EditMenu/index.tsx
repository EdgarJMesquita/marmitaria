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
                <p>{item.content}</p>
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