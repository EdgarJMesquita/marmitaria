import './style.scss';

type SignedProps = {
  name: string;
  avatar: string;
}
export function Signed({name, avatar}:SignedProps){
  console.log(avatar)
  return(
    <div className="user-logged">
      <img src={avatar} alt="avatar" />
      <span>{name}</span>
    </div>
  )
}