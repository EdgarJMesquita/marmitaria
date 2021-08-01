import { Footer } from '../../../components/footer';
import { useAdmin } from '../../../hooks/useAdmin';

export function NewOrders(){
  const { orders } = useAdmin();
  function teste(){
    console.log(orders);
  }
  return(
    <>
      <button onClick={teste}>My Awesome Button to get new Orders</button>
      <Footer />
    </>
  )
}