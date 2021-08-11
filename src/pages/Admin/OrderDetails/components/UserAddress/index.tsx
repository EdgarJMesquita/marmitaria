import whatsAppIcon from '../../../../../assets/images/whatsapp.svg'; 
import googleMapsIcon from '../../../../../assets/images/googleMapsIcon.svg';

type AdminOrdersProps = {
  name: string;
  telephone: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  encodedAddress: string;
}

type UserAddressProps = {
  address: AdminOrdersProps | undefined;
}

export function UserAddress({address}:UserAddressProps){
  const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
  const desktopURL = 'https://www.google.com/maps/search/';
  const androidURL = 'geo:0,0?q=';
  const mapURL = isAndroid? androidURL : desktopURL;

  return(
    <>
      <h1>Endereço</h1>
      <ul>
        <li>{address?.name}</li>
        <li>
          <a href={`https://api.whatsapp.com/send?phone=55${address?.telephone}`} rel="noreferrer" target="_blank" title="Abrir com WhatsApp">
            {address?.telephone} 
            <img src={whatsAppIcon} alt="chamar no whatsapp"/>
          </a>
        </li>
        <li>{address?.cep}</li>
        <li>{address?.street}</li>
        <li>{address?.number}</li>
        <li>{address?.neighborhood}</li>
        <li>
          <a href={`${mapURL}${address?.encodedAddress}`} target="_blank" rel="noreferrer" title="Abrir no mapa">
            Abrir mapa
            <img className="map-icon" src={googleMapsIcon} alt="google map"/>
          </a>
        </li>
      </ul>
    </>
  )
}