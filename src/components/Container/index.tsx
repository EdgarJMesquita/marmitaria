import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  classname?: string | undefined;
}

export function Container({classname, children}:ContainerProps){
  return(
    <div className={classname}>
     {children} 
    </div>
  )
}