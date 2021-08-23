import { Container } from "../../../../../components/Container";
import { GoBackLink } from "../../../../../components/GoBackLink";
import { useAdmin } from "../../../../../hooks/useAdmin";
import { Button } from "../Button";
import { OrderItens } from "../OrderItens";
import { UserAddress } from "../UserAddress";


export function OrderDetailsList(){
  const { selectedOrder } = useAdmin();
  return(
    <Container classname="order-details">
      <GoBackLink />
      <OrderItens itens={selectedOrder?.order}/>
      <UserAddress address={selectedOrder}/>
      <Button orderStatus={selectedOrder?.status} orderId={selectedOrder?.id}/>
    </Container>
  )
}