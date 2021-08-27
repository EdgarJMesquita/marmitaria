import audio from '../assets/notification.mp3';

export function newNotification(){
  const msg = `Você tem um novo pedido`;
  new Notification(msg);
  new Audio(audio).play()
  navigator.vibrate([200,100,200]);
  
  if(Notification.permission !== 'granted'){
    Notification.requestPermission();
  }
}