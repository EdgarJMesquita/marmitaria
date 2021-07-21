import { createContext, ReactNode, useState, useEffect } from 'react';
import { database } from '../services/firebase';

/* const Menu = {
  misturas: [
    {
      id: 'assadoDePanela',
      content: 'Assado de Panela',
      image: 'http://localhost:3000/images/assado.svg',
      isSelected: false
    },
    {
      id: 'frangoAMilanesa',
      content: 'Frango',
      image: 'http://localhost:3000/images/frango.svg',
      isSelected: false
    }
  ],
  guarnicoes: [
    {
      id: 'arroz',
      content: 'Arroz',
      image: 'http://localhost:3000/images/arroz.svg',
      isSelected: false
    },
    {
      id: 'feijao',
      content: 'Feijão',
      image: 'http://localhost:3000/images/feijao.svg',
      isSelected: false
    }
  ]
}
 */
/* const Order = [
  {
    id: 'assadoDePanela',
    content: 'Assado de Panela',
    image: 'http://localhost:3000/images/assado.svg',
    isSelected: false
  },
  {
    id: 'arroz',
    content: 'Arroz',
    image: 'http://localhost:3000/images/arroz.svg',
    isSelected: false
  },
  {
    id: 'feijao',
    content: 'Feijão',
    image: 'http://localhost:3000/images/feijao.svg',
    isSelected: false
  },
  {
    id: 'frangoAMilanesa',
    content: 'Frango',
    image: 'http://localhost:3000/images/frango.svg',
    isSelected: false
  }
] */

type OrderContextProviderProps = {
  children: ReactNode;
}

type OrderProps = {
  id: string;
  content: string;
  image: string;
  isSelected: boolean;
};

type MenuProps = {
  misturas: OrderProps[];
  guarnicoes: OrderProps[];
};

type ContextProps = {
  handleBasket: (id:string)=>void;
  order: OrderProps[];
  count: number;
  menu: MenuProps | undefined;
}

const OrderContext = createContext({} as ContextProps);

function OrderContextProvider(props:OrderContextProviderProps){

  const [ menu, setMenu ] = useState<MenuProps>();
  const [ order, setOrder] = useState<OrderProps[]>([]);
  const [ count, setCount] = useState(0);

  useEffect(()=>{
      const count = order.filter(item=>item.isSelected);
      setCount(count.length);

  },[order]);

  useEffect(()=>{
    const menuRef = database.ref('menu');

    menuRef.once('value',(snap)=>{
      const data:MenuProps = snap.val();
      setMenu(data);
      setOrder([...data.misturas, ...data.guarnicoes])
    });
  },[]);

  function handleBasket(id:string){
    const updatedOrder = order.map(item=>item.id===id? {...item, isSelected:!item.isSelected} : {...item});
    setOrder(updatedOrder);

  }
  
  return(
    <OrderContext.Provider value={{
      order,
      handleBasket,
      count,
      menu
    }}>
      {props.children}
    </OrderContext.Provider>
  );
}

export { OrderContext , OrderContextProvider}