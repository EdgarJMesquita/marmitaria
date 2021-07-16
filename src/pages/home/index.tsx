import './style.scss';
import { Footer } from '../../components/footer';
import assadoImg from '../../assets/images/assado.svg';
import frangoImg from '../../assets/images/frango.svg';

export function Home(){
  return(
    <div>
      <div className="menu">
        <section>
          <h1>Misturas</h1>
          <div className="misturas">
            <div>
              <img src={assadoImg} alt="assado" />
              <p>Assado de panela</p>
            </div>
            <div>
              <img src={frangoImg} alt="frango" />
              <p>Frango a milanesa</p>
            </div>
          </div>
        </section>
        <section>
          <h1>Guarnições</h1>
          <div className="misturas">
            <div>
              <img src={assadoImg} alt="assado" />
              <p>Assado de panela</p>
            </div>
            <div>
              <img src={frangoImg} alt="assado" />
              <p>Frango a milanesa</p>
            </div>
          </div>
        </section>
      </div>
     <Footer count={3}/>
    </div>
  )
}