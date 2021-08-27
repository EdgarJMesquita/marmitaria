import { Route } from "react-router";
import { Cadastro } from "./Cadastro";
import { Home } from "./Home";
import { UserContextProvider } from "../../context/UserContext";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Basket } from "../../components/Basket";

type MatchProps = {
  match: {
    url: string;
  }
}

export function ClientRouter({ match: {url} }:MatchProps){
  return(
    <UserContextProvider>
      <Container classname="main">
        <Header />
        <Route path="/" component={ Home } />
        <Route path={`${url}/cadastro`} component={ Cadastro } />
        <Basket />
      </Container>
    </UserContextProvider>
  );
}