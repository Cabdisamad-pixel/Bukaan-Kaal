import React from 'react'
import ContainerStyle from './Container.module.css'



const ContainerUI = ({children}) => {


  return (
    <div className={ContainerStyle.container}>
      {children}
    </div>
  );
};
export default ContainerUI