import AdminDashboar from "../pages/admin/AdminDashboard/AdminDashboar";
import AdminLogin from "../pages/admin/AdminLogin/AdminLogin";
import AdminRoot from "../pages/admin/AdminRoot";
import Users from "../pages/admin/Users/Users";
import About from "../pages/client/About/About";
import ClientLogin from "../pages/client/ClientLogin/ClientLogin";
import ClientRegister from "../pages/client/ClientRegister/ClientRegister";
import ClientRoot from "../pages/client/ClientRoot";
import CompanyDashboard from "../pages/client/CompanyDashboard/CompanyDashboard";
import Contact from "../pages/client/Contact/Contact";
import Home from "../pages/client/Home/Home";
import UserDashboard from "../pages/client/UserDashboard/UserDashboard";


export const ROUTES = [
    {
        path:"/",
        element:<ClientRoot/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"login",
                element:<ClientLogin/>
            },
            {
                path:"register",
                element:<ClientRegister/>
            },
            {
                path:"user-dashboard",
                element:<UserDashboard/>
            },
            {
                path:"company-dashboard",
                element:<CompanyDashboard/>
            },
            {
                path:"contact",
                element:<Contact/>
            },
            {
                path:"about",
                element:<About/>
            },

        ]
    },
    {
        path:"/admin",
        element:<AdminRoot/>,
        children:[
            {
                index:true,
                element:<AdminDashboar/>
            },
            {
                path:"login",
                element:<AdminLogin/>
            },
            {
                path:"users",
                element:<Users/>
            },


        ]
    },
]