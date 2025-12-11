import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
export const AuthLayout = () => {
  return (
    <>
     <div className="bg-gradient-to-br from-gray-950 via-slate-950 to-cyan-950 min-h-screen">
            <div className="max-w-lg mx-auto pt-10 px-5">
                <img src="/logo.svg" alt="Logo" />

                <div className="py-10">
                    <Outlet/>
                </div>
            </div>
            

        </div>
        <Toaster position='top-right'/>
    </>
  )
}