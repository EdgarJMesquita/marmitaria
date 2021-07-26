


import { useUser } from '../../../hooks/useUser';
import './style.scss';

export function UserForm(){
  const { 
    name,
    setName,
    cep,
    setCep,
    rua,
    setRua,
    numero,
    setNumero,
    bairro,
    setBairro,
    hasFailed,
    handleSendOrder
  } = useUser();

  return(
    <form onSubmit={handleSendOrder}>
      <div>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Digite seu nome" />
        {name.length < 3 && hasFailed && <span>Digite seu nome</span>}
      </div>
      <div>
        <input onChange={(e)=>setCep(e.target.value)} value={cep} type="text" placeholder="00000-00" />
      </div>
      <div>
        <input onChange={(e)=>setRua(e.target.value)} value={rua} type="text" placeholder="Rua" />
        {rua.length < 3 && hasFailed && <span>Digite a rua</span>}
      </div>
      <div>
        <input onChange={(e)=>setNumero(e.target.value)} value={numero} type="text" placeholder="Número" />
        {numero.length < 1 && hasFailed && <span>Digite o número</span>}
      </div>
      <div>
        <input onChange={(e)=>setBairro(e.target.value)} value={bairro} type="text" placeholder="Bairro" />
        {bairro.length < 3 && hasFailed && <span>Digite o bairro</span>}
      </div>
      <button type="submit">
        Finalizar pedido
      </button>
    </form> 
  )
}