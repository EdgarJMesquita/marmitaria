import { NavBar } from "../../../components/NavBar";
import { useOrder } from "../../../hooks/useOrder";
import { useAdmin } from "../../../hooks/useAdmin";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import availableIcon from '../../../assets/images/selected.svg';
import notAvailableIcon from '../../../assets/images/close.svg';
import { SideOrderDetails } from "../../../components/SideOrderDetails";

export function EditMenu(){
  const { menu } = useOrder();
  const { handleMenu, updateMenu } = useAdmin();

  return(
    <Container classname="main">
      <Header />
      <Container classname="desktop">
        <Container classname="orders">
          <h1>Edite o menu</h1>
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
          <SideOrderDetails />
        </Container>
        <NavBar />
    </Container>
  )
}