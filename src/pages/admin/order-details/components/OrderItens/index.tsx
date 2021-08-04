type OrderItensProps = {
  itens: string[] | undefined
}

export function OrderItens({itens}:OrderItensProps){
  return(
    <>
      <h3>Pedido</h3>
        <ul>
          {itens?.map((item,index)=>{
            return(
              <li key={index}>1x {item}</li>
              )
            })}
        </ul>
    </>
  )
}