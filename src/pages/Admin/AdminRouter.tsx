import { Route } from "react-router";
import { Login } from "./Login";
import { NewOrders } from "./NewOrders";
import { Shipping } from "./Shipping";
import { OrderDetails } from "./OrderDetails";
import { EditMenu } from "./EditMenu";
import { AdminContextProvider } from '../../context/AdminContext';

type AdminProps = {
  match:{
    url:string;
  }
}


export function AdminRouter({ match:{ url } }:AdminProps){
  return(
    <AdminContextProvider>
      <Route path={`${url}/`} exact component={ Login } />
      <Route path={`${url}/shipping`} component={ Shipping }/>
      <Route path={`${url}/new-orders`} component={ NewOrders }/>
      <Route path={`${url}/order-details`} component={ OrderDetails }/>
      <Route path={`${url}/edit-menu`} component={ EditMenu }/>
    </AdminContextProvider>
  );
}