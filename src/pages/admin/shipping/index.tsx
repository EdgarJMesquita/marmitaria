import { Footer } from "../../../components/footer";
import { useAdmin } from "../../../hooks/useAdmin";
import { Orders } from "../orders";

export function Shipping(){
  const { shippingOrders } = useAdmin();
  return(
    <>
      <Orders title="Pedidos prontos para entrega" orders={shippingOrders}/>
      <Footer />
    </>
  )
}