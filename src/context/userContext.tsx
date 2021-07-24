import { createContext, FormEvent, useEffect, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import { database } from "../services/firebase";
import { OrderContextProviderProps } from "../types";

type UserContextProps = {
  name: string;
  setName: (arg:string)=>void;
  cep: string;
  setCep: (arg:string)=>void;
  rua: string;
  setRua: (arg:string)=>void;
  numero: string;
  setNumero: (arg:string)=>void;
  bairro: string;
  setBairro: (arg:string)=>void;
  handleSendOrder: (event:FormEvent)=>void;
};

type CepProps = {
  street: string;
  neighborhood: string;
}

const UserContext = createContext({} as UserContextProps)

function UserContextProvider(props:OrderContextProviderProps){
  const { order } = useOrder();
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');


  useEffect(() => {
    const getCep = async()=>{
      if(cep.length === 8 ){
        const url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
        const promise = await fetch(url);
        const { street,neighborhood }:CepProps = await promise.json();

        if(promise.status===200){
          street && setRua(street);
          neighborhood &&  setBairro(neighborhood);
        }
      }
    }
    getCep();
  }, [cep]);

  function handleSendOrder(event:FormEvent){
    event.preventDefault();
    
    if(name && rua && numero && bairro && order.length > 2) {
      
      const orderRef = database.ref('orders');
      orderRef.push({
        order: order.map(item=>(item.content)),
        name,
        cep,
        rua,
        numero,
        bairro
      });
      
      if(orderRef.key){
        console.log('Success');
        
      }
    }
  }
  return(
    <UserContext.Provider value={{
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
      handleSendOrder
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider}