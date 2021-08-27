import { Route } from "react-router";
import { Login } from "./Login";
import { NewOrders } from "./NewOrders";
import { Shipping } from "./Shipping";
import { OrderDetails } from "./OrderDetails";
import { EditMenu } from "./EditMenu";
import { NavBar } from "../../components/NavBar";
import { Container } from "../../components/Container";
import { SideOrderDetails } from "../../components/SideOrderDetails";
import { AdminContextProvider } from '../../context/AdminContext';

type AdminProps = {
  match:{
    url:string;
  }
}

export function AdminRouter({ match:{ url } }:AdminProps){
  return(
    <AdminContextProvider>
      <Container classname="desktop">
        <Route path={`${url}/`} exact component={ Login } />
        <Route path={`${url}/shipping`} exact component={ Shipping }/>
        <Route path={`${url}/new-orders`} exact component={ NewOrders }/>
        <Route path={`${url}/order-details`} exact component={ OrderDetails }/>
        <Route path={`${url}/edit-menu`} exact component={ EditMenu }/>
        <SideOrderDetails />
      </Container>
      <NavBar />
    </AdminContextProvider>
  );
}