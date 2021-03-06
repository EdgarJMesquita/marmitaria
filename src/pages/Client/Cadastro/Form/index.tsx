import { useUser } from '../../../../hooks/useUser';
import searchIcon from '../../../../assets/images/searchIcon.svg';
import './style.scss';

export function Form(){
  const {
    user,
    handleInput,
    getCep,
    hasFailed,
    handleSendOrder
  } = useUser();

  return(
    <form onSubmit={handleSendOrder}>
      <div>
        <input onChange={handleInput} value={user.name} name="name" type="text" placeholder="Digite seu nome" />
        {user.name.length < 3 && hasFailed && <span>Digite no mínimo 3 letras</span>}
      </div>

      <div>
        <input onChange={handleInput} value={user.telephone} name="telephone" type="tel" min="16" required placeholder="(00) 00000-0000" />
        {user.telephone.length !==16 && hasFailed && <span>Siga o formato correto. Ex: (85) 9.8877-7665</span>}
      </div>

      <div className="cep-input-container">
        <input onChange={handleInput} value={user.cep} name="cep" className="cep-input" type="tel" placeholder="00000-00" />
        {user.cep.length !== 8 && hasFailed && <span>Cep inválido</span>}
        <div onClick={getCep} className="search-cep"><img src={searchIcon} alt="procurar cep" /></div> 
      </div>
      
      <div>
        <input onChange={handleInput} value={user.street} name="street" type="text" placeholder="Rua" />
        {user.street.length < 3 && hasFailed && <span>Digite a rua</span>}
      </div>
      
      <div>
        <input onChange={handleInput} value={user.number} name="number" type="tel" placeholder="Número" />
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