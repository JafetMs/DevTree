import { Link } from "react-router-dom"

export const HomeNavigation = () => {
  return (
   <>

   <div className="flex gap-3">
     <Link
        className=" text-white p-2 uppercase font-bold text-xs cursor-pointer rounded-lg"
        to='/auth/login'
    
    >Log In</Link>

     <Link
        className=" text-white p-2 uppercase font-bold text-xs cursor-pointer rounded-lg"
        to='/auth/register'
    
    >Register</Link>
   </div>
   
   
   </>
  )
}