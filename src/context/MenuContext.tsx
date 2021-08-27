import { createContext, useState, useEffect } from 'react';
//services
import { database } from '../services/firebase';
// types
import { ChildrenProps, OrderProps } from '../types';

type ContextProps = {
  handleBasket: (id:string)=>void;
  clearOrder: ()=>void;
  menu: OrderProps[];
  setMenu: (id:OrderProps[])=>void;
}

const MenuContext = createContext({} as ContextProps);

function MenuContextProvider({children}:ChildrenProps){
  const [ menu, setMenu] = useState<OrderProps[]>([]);

  useEffect(()=>{
    const menuRef = database.ref('menu');

    menuRef.once('value',(snap)=>{
      const data:OrderProps[] = snap.val();
      const _menu = data.map(item=>({...item, isSelected: false}));
      setMenu(_menu);

    });
  }, []);
 
  function willExceedMisturasLimite({type,isSelected}:OrderProps){
    const hasTwoSelectedMisturas = menu.filter(({isSelected, type})=> isSelected && type === 'misturas').length >= 2;
    const isMistura = type === 'misturas';
    const isntSelected = !isSelected;

    return hasTwoSelectedMisturas && isMistura && isntSelected;
  }

  function handleBasket(id:string){
    const updatedOrder = menu.map(item=>item.id === id ? { ...item, isSelected: willExceedMisturasLimite(item)? false : !item.isSelected } : {...item})
    setMenu(updatedOrder);

   /*  const updatedOrder = menu.map(item=>{
      if(item.id === id) 
        // const selectedMisturas = menu.filter(({isSelected, type})=> isSelected && type === 'misturas');
        // const twoSelectedMisturas = item.type === 'misturas' && selectedMisturas.length === 2 && !item.isSelected;
        // const isSelected = twoSelectedMisturas? item.isSelected : !item.isSelected; 
        return { ...item, isSelected: checkIfTwoMisturasAreSelected(item)? false: !item.isSelected } 
       
      
      return { ...item }
    }); */


    /* const updatedOrder = menu.map(item=>{
      if(item.id === id) {
        const selectedMisturas = menu.filter(({isSelected, type})=> isSelected && type === 'misturas');
        if(item.type === 'misturas' && selectedMisturas.length === 2 && !item.isSelected){
          return { ...item, isSelected: false }

        }
        return { ...item, isSelected: !item.isSelected } 
       
      }
      return { ...item }
    }); */


    // Um pouco difício de ler com tantos ternários 
    /*const updatedOrder = menu.map(item=>{
      const isTwoMisturasSelected = menu.filter(({isSelected, type})=> isSelected && type==='misturas').length === 2;
      const twoMisturasSelected = item.type === 'misturas' && isTwoMisturasSelected && !item.isSelected;
      const isSelected = twoMisturasSelected? item.isSelected : !item.isSelected;

      return item.id===id? { ...item, isSelected } : {...item}
    }); */
      

  }

  function clearOrder(){
    const emptyOrder = menu.map(item=>({...item, isSelected: false}))
    setMenu(emptyOrder);
  }
  
  return(
    <MenuContext.Provider value={{
      menu,
      setMenu,
      handleBasket,
      clearOrder
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export { MenuContext , MenuContextProvider}

