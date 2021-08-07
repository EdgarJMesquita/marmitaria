import { Container } from "../../../components/Container";
import { Footer } from "../../../components/Footer";
import { useOrder } from "../../../hooks/useOrder";
import notAvailableIcon from '../../../assets/images/close.svg';
import availableIcon from '../../../assets/images/selected.svg';
import { useAdmin } from "../../../hooks/useAdmin";
//import './style.scss';

export function EditarMenu(){
  const { menu } = useOrder();
  const { handleMenu, updateMenu } = useAdmin();

  return(
    <>
      <Container classname="">
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
      <Footer />
    </>
  )
}