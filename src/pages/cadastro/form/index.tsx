


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
        <input onChange={(e)=>handleInput('name',e.target.value)} value={address.name} type="text" placeholder="Digite seu nome" />
        {address.name.length < 3 && hasFailed && <span>Digite seu nome</span>}
      </div>
      <div>
        <input onChange={(e)=>handleInput('cep',e.target.value)} value={address.cep} type="text" placeholder="00000-00" />
      </div>
      <div>
        <input onChange={(e)=>handleInput('rua',e.target.value)} value={address.rua} type="text" placeholder="Rua" />
        {address.rua.length < 3 && hasFailed && <span>Digite a rua</span>}
      </div>
      <div>
        <input onChange={(e)=>handleInput('numero',e.target.value)} value={address.numero} type="text" placeholder="Número" />
        {address.numero.length < 1 && hasFailed && <span>Digite o número</span>}
      </div>
      <div>
        <input onChange={(e)=>handleInput('bairro',e.target.value)} value={address.bairro} type="text" placeholder="Bairro" />
        {address.bairro.length < 3 && hasFailed && <span>Digite o bairro</span>}
      </div>
      <button type="submit">
        Finalizar pedido
      </button>
    </form> 
  )
}