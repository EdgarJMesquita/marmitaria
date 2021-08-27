
type BananaProps = {
  cep:string;
  number:string;
  street:string;
  neighborhood:string;
}

function encodeString(str:string){
  return str.split(' ').join('+')
}

export function convertAddressToURL({ number, street, neighborhood, cep }:BananaProps){

  return [ number, encodeString(street), encodeString(neighborhood), cep ].join('%2C');

}