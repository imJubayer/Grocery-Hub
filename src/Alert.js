import React, { useEffect } from 'react'

const Alert = ({alert, removeAlert, list}) => {
  useEffect(() => {
    const timeout = setInterval(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  },[list]);
  
  const {type, msg} = alert;
  return (
    <>
      <p className={`alert alert-${type}`}>{msg}</p>
    </>
  )
}
export default Alert
