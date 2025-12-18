import { BrowserRouter,Routes,Route } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import { AuthLayout } from "./layouts/AuthLayout";
import AppLayout from "./layouts/App.layout";
import { LinkTreeView } from "./views/LinkTreeView";
import  ProfileView  from "./views/ProfileView";
import { HandleView } from "./views/HandleView";
import { NotFoundView } from "./views/NotFoundView";
import { HomeView } from "./views/HomeView";



export const Router = () => {

   ('http://localhost:5173/auth/login/');
   ('http://localhost:5173/admin/');
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path='/auth/login' element={<LoginView />}/>
                <Route path='/auth/register' element={<RegisterView />}/>
            </Route>
           
            <Route path='/admin'element={<AppLayout/>}>
              <Route index={true} element={<LinkTreeView/>}></Route>
              <Route path='profile' element={<ProfileView/>}></Route>

            </Route>

            <Route path='/:handle' element={<AuthLayout/>}>
                <Route element={<HandleView/>} index={true}>
                
                </Route>

            </Route>

            <Route  path='/' element={<HomeView/>}>
            
            </Route>

            <Route path='/404' element={<AuthLayout/>}>
                <Route element={<NotFoundView/>} index={true}></Route>

            </Route>
        </Routes>
    </BrowserRouter>
  )
}