type OrderItensProps = {
  itens: string[] | undefined
}

export function OrderItens({itens}:OrderItensProps){
  return(
    <>
      <h1>Pedido</h1>
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