import { useEffect } from "react";
import { useMenu } from "../../../hooks/useMenu";
import { useAdmin } from "../../../hooks/useAdmin";
import { Container } from "../../../components/Container";
import { OrderPlaceholder } from "../../../components/OrdersList/Placeholder";
import availableIcon from '../../../assets/images/selected.svg';
import notAvailableIcon from '../../../assets/images/close.svg';

export function EditMenu(){
  const { menu } = useMenu();
  const { handleMenu, updateMenu, setSelectedPage } = useAdmin();

  useEffect(() => {
    let isFirstLoad = true;
    isFirstLoad && setSelectedPage('edit-menu');
    
    return () => {
      isFirstLoad = false;  
    }
  }, [setSelectedPage]);

  return(
    <Container classname="orders">
      <h1>Edite o menu</h1>
      <ul>
        {menu.length === 0 && <OrderPlaceholder/>}
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
  )
}