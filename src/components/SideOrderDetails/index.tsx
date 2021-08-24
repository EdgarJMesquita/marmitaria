import { useAdmin } from "../../hooks/useAdmin";
import { Button } from "../../pages/Admin/OrderDetails/Button";
import { OrderItens } from "../../pages/Admin/OrderDetails/OrderItens";
import { UserAddress } from "../../pages/Admin/OrderDetails/UserAddress";
import { Container } from "../Container";
import descriptionIcon from '../../assets/images/description.svg';
import './style.scss';

export function SideOrderDetails(){
  const { selectedOrder, selectOrderToShowDetails } = useAdmin();
  return(
    <Container classname="aside-order-details">
      {selectedOrder?
        <> 
          <section>
            <div>
              <OrderItens itens={selectedOrder?.order}/>
            </div>
            <div>
              <UserAddress address={selectedOrder}/>
            </div>
          </section>
          <Button orderStatus={selectedOrder?.status} orderId={selectedOrder?.id}/>
          <span onClick={()=>selectOrderToShowDetails('')} className="close-btn">
            x
          </span>
        </>
        : 
        <div className="aside-order-details-placeholder">
          <img src={descriptionIcon} alt="descrição" />
          <span>Selecione um pedido</span>
        </div>  
    }
    </Container>
  )
}