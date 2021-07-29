import { useUser } from '../../../hooks/useUser';
import './style.scss';

export function UserForm(){
  const {
    address,
    handleInput,
    hasFailed,
    handleSendOrder
  } = useUser();

 
  return(
    <form onSubmit={handleSendOrder}>
      <div>
        <input onChange={handleInput} value={address.name} name="name" type="text" placeholder="Digite seu nome" />
        {address.name.length < 3 && hasFailed && <span>Digite seu nome</span>}
      </div>
      <div>
        <input onChange={handleInput} value={address.cep} name="cep" type="text" placeholder="00000-00" />
      </div>
      <div>
        <input onChange={handleInput} value={address.street} name="street" type="text" placeholder="Rua" />
        {address.street.length < 3 && hasFailed && <span>Digite a rua</span>}
      </div>
      <div>
        <input onChange={handleInput} value={address.number} name="number" type="text" placeholder="Número" />
        {address.number.length < 1 && hasFailed && <span>Digite o número</span>}
      </div>
      <div>
        <input onChange={handleInput} value={address.neighborhood} name="neighborhood" type="text" placeholder="Bairro" />
        {address.neighborhood.length < 3 && hasFailed && <span>Digite o bairro</span>}
      </div>
      <button type="submit">
        Finalizar pedido
      </button>
    </form> 
  )
}