
export function newNotification(number:number){
    if(number === 0) return;
    function notify(){
      const msg = `${number} Novo(s) pedido(s)`;
      new Notification(msg);
      navigator.vibrate([200,100,200]);
      console.log('notifed');
      
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