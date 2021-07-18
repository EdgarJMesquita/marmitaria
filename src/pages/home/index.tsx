import { Footer } from '../../components/footer';
import assadoImg from '../../assets/images/assado.svg';
import frangoImg from '../../assets/images/frango.svg';
import arrozImg from '../../assets/images/arroz.svg';
import feijaoImg from '../../assets/images/feijao.svg';
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
  const { order, count, handleBasket } = useOrder();

  return(
    <div>
      <div className="menu">
        <section>
          <h1>Misturas</h1>
          <div>
            <div onClick={()=>handleBasket('assadoDePanela')}>
              <img src={assadoImg} alt="assadoDePanela" />
              <p>Assado de Panela</p>
            </div>
            <div onClick={()=>handleBasket('frangoAMilanesa')}>
              <img src={frangoImg} alt="frangoAMilanesa" />
              <p>Frango a Milanesa</p>
            </div>
          </div>
        </section>
        <section>
          <h1>Guarnições</h1>
          <div>
            <div onClick={()=>handleBasket('arroz')}>
              <img src={arrozImg} alt="arroz" />
              <p>Arroz</p>
            </div>
            <div onClick={()=>handleBasket('feijao')}>
              <img src={feijaoImg} alt="feijao" />
              <p>Feijão</p>
            </div>
          </div>
        </section>
      </div>
      <Basket order={order}/>
      <Footer count={count}/>
    </div>
  )
}