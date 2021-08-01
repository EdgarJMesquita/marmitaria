// React Hooks/types
import { createContext, FormEvent, useEffect, useState } from 'react';
// Database connection
import { database } from '../services/firebase';
// Types
import { OrderContextProviderProps } from '../types';
import { useHistory } from 'react-router';
// Custom Hooks
import { useOrder } from '../hooks/useOrder';
import { useAuth } from '../hooks/useAuth';
// Third party libraries
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

function UserContextProvider(props:OrderContextProviderProps){
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
      const userDataRef = database.ref(`users/${userAuth?.id}`)
      userDataRef.once('value',snap=>{
        const userData:UserProps | undefined = snap.val();
        userData && setUser({...userData});
        
      })
    }
  }, [userAuth]);

  
  function handleInput(event:FormEvent<HTMLInputElement>){
    const { name, value } = event.currentTarget;
    setUser(prevState=>({...prevState, [name]: value}));
  }

  /* useEffect(() => {
    (async()=>{
      if(user.cep.length === 8 ){
        const url = `https://brasilapi.com.br/api/cep/v1/${user.cep}`;
        const promise = await fetch(url);
        const { street, neighborhood }:CepProps = await promise.json();

        if(promise.status===200){
          setUser(prevState=>({
            ...prevState, 
              street,
              neighborhood  
          }))
        }
      }
    })();
  }, [user.cep]); */

  async function getCep(){
    if(user.cep.length === 8){
      const url = `https://brasilapi.com.br/api/cep/v1/${user.cep}`;
      const promise = await fetch(url);
      
      if(promise.status === 200){
        const res: CepProps = await promise.json();
        const { street, neighborhood} = res;
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

  function getOrder(){
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
    return name && telephone && street && number && neighborhood;
  }

  function sendOrder(order:string[]){

    const userOrder = {
      ...user,
      order,
      status: 'new'
    }

    database.ref('orders').push(userOrder)
      .then(()=>{
        Swal('Pedido enviado!','Seu pedido já foi processado','success');
        history.push('/');
        clearOrder();
        
      }).catch(err=> {
        throw new Error(`Serviço indisponível ${err}`)
      })

    if(userAuth){
      const userRef = database.ref(`users/${userAuth?.id}`);
      userRef.update(user)
        .then(()=>console.log('Usuário cadastrado!'))
        .catch(err=>{ throw new Error(`Indisponível ${err}`) })
    }
  }

  function handleSendOrder(event:FormEvent){
    event.preventDefault();

    const order = getOrder();
    
    if(order && checkUserInput()) {
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

export { UserContext, UserContextProvider} 

