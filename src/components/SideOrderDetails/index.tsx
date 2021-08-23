import { useAdmin } from "../../hooks/useAdmin";
import { Button } from "../../pages/Admin/OrderDetails/components/Button";
import { OrderItens } from "../../pages/Admin/OrderDetails/components/OrderItens";
import { UserAddress } from "../../pages/Admin/OrderDetails/components/UserAddress";
import { Container } from "../Container";
import { GoBackLink } from "../GoBackLink";
import './style.scss';

export function SideOrderDetails(){
  const { selectedOrder } = useAdmin();
  return(
    <Container classname="aside-order-details">
      {selectedOrder &&
        <> 
          <GoBackLink />
          <OrderItens itens={selectedOrder?.order}/>
          <UserAddress address={selectedOrder}/>
          <Button orderStatus={selectedOrder?.status} orderId={selectedOrder?.id}/>
        </>
      }
    </Container>
  )
}