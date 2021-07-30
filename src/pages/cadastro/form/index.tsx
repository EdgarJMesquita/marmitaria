import { useUser } from '../../../hooks/useUser';
import './style.scss';

export function UserForm(){
  const {
    user,
    handleInput,
    hasFailed,
    handleSendOrder
  } = useUser();

  return(
    <form onSubmit={handleSendOrder}>
      <div>
        <input onChange={handleInput} value={user.name} name="name" type="text" placeholder="Digite seu nome" />
        {user.name.length < 3 && hasFailed && <span>Digite seu nome</span>}
      </div>
      <div>
        <input onChange={handleInput} value={user.telephone} name="telephone" type="text" placeholder="(00) 0000-0000" />
        {user.telephone.length < 3 && hasFailed && <span>Digite seu nome</span>}
      </div>
      <div>
        <input onChange={handleInput} value={user.cep} name="cep" type="text" placeholder="00000-00" />
      </div>
      <div>
        <input onChange={handleInput} value={user.street} name="street" type="text" placeholder="Rua" />
        {user.street.length < 3 && hasFailed && <span>Digite a rua</span>}
      </div>
      <div>
        <input onChange={handleInput} value={user.number} name="number" type="text" placeholder="Número" />
        {user.number.length < 1 && hasFailed && <span>Digite o número</span>}
      </div>
      <div>
        <input onChange={handleInput} value={user.neighborhood} name="neighborhood" type="text" placeholder="Bairro" />
        {user.neighborhood.length < 3 && hasFailed && <span>Digite o bairro</span>}
      </div>
      <button type="submit">
        Finalizar pedido
      </button>
    </form> 
  )
}