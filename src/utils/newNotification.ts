 
export function newNotification(){

    function notify(){
      const msg = `Você tem um novo pedido`;
      new Notification(msg);
      navigator.vibrate([200,100,200]);
      
    }
    
    if(!('Notification' in window)){
      alert('Seu browser não suporta notificações.')
    
    }else if(Notification.permission === 'granted'){
      notify();
      
    }else if(Notification.permission !== 'denied'){
      Notification.requestPermission().then(permission=>{
        if(permission === 'granted') notify();
      })
    }
  
  
}