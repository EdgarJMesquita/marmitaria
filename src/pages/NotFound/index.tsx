import { Container } from "../../components/Container";
import './style.scss';

export function NotFound(){
  return(
    <Container classname="">
      <div>
        <h1>Página não encontrada</h1>
        <button >Ir para Home</button>
      </div>
    </Container>
  )
}