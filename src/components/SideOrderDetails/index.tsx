import { useAdmin } from "../../hooks/useAdmin";
import { Button } from "../../pages/Admin/OrderDetails/Button";
import { OrderItems } from "../../pages/Admin/OrderDetails/OrderItems";
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
            <OrderItems items={selectedOrder?.order}/>
          </div>
          <div>
            <UserAddress address={selectedOrder}/>
          </div>
        </section>
        <div className="btn-con">
          <Button orderStatus={selectedOrder?.status} orderId={selectedOrder?.id}/>
        </div>
        <span onClick={()=>selectOrderToShowDetails(null)} className="close-btn">
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