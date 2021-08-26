import { Route } from "react-router";
import { Cadastro } from "./Cadastro";
import { Home } from "./Home";
import { UserContextProvider } from "../../context/UserContext";

export function ClientRouter(){
  return(
    <UserContextProvider>
      <Route path="/" exact component={ Home } />
      <Route path="/cadastro" component={ Cadastro } />
    </UserContextProvider>
  );
}