type OrderItemsProps = {
  items: string[] | undefined
}

export function OrderItems({items}:OrderItemsProps){
  return(
    <>
      <h1>Pedido</h1>
        <ul>
          {items?.map((item,index)=>{
            return(
              <li key={index}>1x {item}</li>
              )
            })}
        </ul>
    </>
  )
}