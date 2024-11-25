import { PiWarningDiamondBold } from "react-icons/pi"

const Alert = ({ message }) => {
  
  return (
    <>
      <div role="alert" className="alert alert-error">
        <PiWarningDiamondBold className="h-6 w-6 shrink-0 stroke-current"/>
        <p>{message}</p>
        
      </div>
    </>
  )
}

export default Alert