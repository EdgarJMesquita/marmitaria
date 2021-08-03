export function encodeAddressURL(str:string){
  return str.split(' ').join('+').split('-').join('+')
}