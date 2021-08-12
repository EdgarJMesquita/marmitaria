
export function formatDate(){
  const date = new Date();
  const minutes = date.getDate();
  const hour = date.getHours();
  console.log({ minutes, hour })
  console.log(Date.now().toString())
}