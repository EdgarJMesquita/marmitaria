
export function OrderPlaceholder(){
  return(
    <>
      <li id="order-placeholder">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </li>
      <li id="order-placeholder">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </li>
      <li id="order-placeholder">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </li>
    </>
  )
}

/* Alternativa de placeholder com #order-placeholder
<li id="order-placeholder" />
<li id="order-placeholder" />
<li id="order-placeholder" /> 
*/