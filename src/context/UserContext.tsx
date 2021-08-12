// React Hooks/types
import { createContext, FormEvent, useEffect, useState } from 'react';
// Database connection
import { database } from '../services/firebase';
// Types
import { ChildrenProps } from '../types';
import { useHistory } from 'react-router';
// Custom Hooks
import { useOrder } from '../hooks/useOrder';
import { useAuth } from '../hooks/useAuth';
// Third party Modal library
import Swal from 'sweetalert';

type UserProps = {
  name: string;
  telephone: string;
  cep:string;
  street:string;
  number:string;
  neighborhood:string;
};
type UserContextProps = {
  user: UserProps;
  handleInput: (event:FormEvent<HTMLInputElement>)=>void;
  getCep: ()=>void;
  hasFailed: boolean;
  handleSendOrder: (event:FormEvent)=>void;
};
type CepProps = {
  street: string;
  neighborhood: string;
};

const UserContext = createContext({} as UserContextProps)

function UserContextProvider(props:ChildrenProps){
  const [ user, setUser] = useState<UserProps>({
    name: '',
    telephone: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: ''
  });
  const [ hasFailed, setHasFailed ] = useState(false);
  const { userAuth } = useAuth();
  const { menu, clearOrder } = useOrder();
  const history = useHistory();

  useEffect(() => {
    if(userAuth){
      // Usuário cadastrado
      // Recuperando dados do banco de dados
      const userDataRef = database.ref(`users/${userAuth?.id}`)
      userDataRef.once('value',snap=>{
        const userData:UserProps | undefined = snap.val();
        userData && setUser({...userData});
        
      })
    }else{
      // Usuário não cadastrado
      // Recuperando dados do localStorage 
      const data = localStorage.getItem('userAddress');
      data && setUser(JSON.parse( data ));
    }
  }, [userAuth]);

  function handleTelephone(value:string){
    
    let telephone = value;
    const telLength = value.length;
    
    if(telLength > 16) {
      return telephone;
    }

    if(value.length === 1){
      telephone = `(${value}`;

    }else if(telephone.length === 3){
      telephone = `${value}) `;
     
    }else if(telephone.length === 6){
      telephone = `${value}.`

    }else if(telephone.length === 11){
      telephone = `${value}-`

    }
    if(user.telephone.length > telLength){
      telephone = value.slice(0,value.length);
    }
    return telephone
  }

  function handleInput(event:FormEvent<HTMLInputElement>){
    const { name, value } = event.currentTarget;
    if(name === 'telephone'){
      const telephone = handleTelephone(value);
      setUser(prevState=>({...prevState, telephone}));

    }else{
      setUser(prevState=>({...prevState, [name]: value}));
    }
  }

  async function getCep(){
    if(user.cep.length === 8){
      const url = `https://brasilapi.com.br/api/cep/v1/${user.cep}`;
      const promise = await fetch(url);
      
      if(promise.status === 200){
        const res: CepProps = await promise.json();
        const { street, neighborhood } = res;
        setUser(prevState=>({
          ...prevState,
          street,
          neighborhood
        }))

      }else{
        Swal('Cep não encontrado','Confira o cep digitado','error')
      }

    }else{
      setHasFailed(true)
    }
  }

  function validateOrder(){
    const order = menu.filter(item=>item.isSelected).map(item=>item.content);
    if(order.length < 1) {
      Swal('Sua cestinha está vazia','Você ainda não escolheu seu prato, deseja ir ao cardápio?','info',{ buttons:['Cancelar','Confirmar']})
      .then(res=>res && history.push('/'));
      return 0;
    }
    return order;
  }

  function checkUserInput(){
    const { name, telephone, street, number, neighborhood } = user;
    return name && telephone.length === 16 && street && number && neighborhood;
  }

  function sendOrder(order:string[]){

    const userOrder = {
      ...user,
      order,
      status: 'new',
      createdAt: Date.now()
    }

    database.ref('orders').push(userOrder)
      .then(()=>{
        Swal('Pedido enviado!','Seu pedido já foi processado','success');
        history.push('/');
        clearOrder();
        
      }).catch(err=> {
        Swal('Serviço indisponível',`${err}`,'error')
        throw new Error(`Serviço indisponível ${err}`)
      })


    if(userAuth){
      const userRef = database.ref(`users/${userAuth?.id}`);

      userRef.update(user)
        .catch(err=>{ throw new Error(`Indisponível ${err}`) });
        
    }else {
      localStorage.setItem('userAddress',JSON.stringify(user));

    }
  }

  function handleSendOrder(event:FormEvent){
    event.preventDefault();

    const order = validateOrder();
    const isUserInputValited = checkUserInput();
    
    if(order && isUserInputValited) {
      sendOrder(order);
      
    }else{
      setHasFailed(true);
    }
  }

  return(
    <UserContext.Provider value={{
      user,
      handleInput,
      getCep,
      hasFailed,
      handleSendOrder
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider } 

