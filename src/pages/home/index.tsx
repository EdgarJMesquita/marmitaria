//import assadoImg from '../../assets/images/assado.svg';
//import frangoImg from '../../assets/images/frango.svg';
//import arrozImg from '../../assets/images/arroz.svg';
//import feijaoImg from '../../assets/images/feijao.svg';
import { Footer } from '../../components/footer';
import { Basket } from '../../components/basket';
import { useOrder } from '../../hooks/useOrder';
import './style.scss';

/* type MenuItemProps = Record<string,{
  name: string,
  image: string,
  id: number
}>;

type MenuProps = {
  misturas: MenuItemProps[]
} */


export function Home(){
  const { menu, order, count, handleBasket } = useOrder();

  return(
    <div>
      <div className="menu">
        <section>
          <h1>Misturas</h1>
          <div>
          { menu?(
            menu?.misturas.map(item=>{
              return(
              <div key={item.id} onClick={()=>handleBasket(item.id)}>
                <img src={item.image} alt={item.content} />
                <p>{item.content}</p>
              </div>
              )
            })
          ):(
            <p>Carregando</p>
          ) }
          </div>
        </section>
        <section>
          <h1>Guarnições</h1>
          <div>
          { menu?(
            menu?.guarnicoes.map(item=>{
              return(
              <div key={item.id} onClick={()=>handleBasket(item.id)}>
                <img src={item.image} alt={item.content} />
                <p>{item.content}</p>
              </div>
              )
            })
          ):(
            <p>Carregando</p>
          ) }
          </div>
        </section>
      </div>
      <Basket order={order}/>
      <Footer count={count}/>
    </div>
  )
}