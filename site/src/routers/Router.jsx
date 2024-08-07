import ErrorPage from "../pages/Error/ErrorPage";
import AdminDashboar from "../pages/admin/AdminDashboard/AdminDashboar";
import AdminLogin from "../pages/admin/AdminLogin/AdminLogin";
import AdminRoot from "../pages/admin/AdminRoot";
import BlogAdd from "../pages/admin/BlogAdd/BlogAdd";
import BlogEdits from "../pages/admin/BlogEdits/BlogEdits";
import Users from "../pages/admin/Users/Users";
import About from "../pages/client/About/About";
import Blogs from "../pages/client/Blogs/Blogs";
import BlogDetail from "../pages/client/BlogsDetails/BlogDetail";
import ClientLogin from "../pages/client/ClientLogin/ClientLogin";
import ClientRegister from "../pages/client/ClientRegister/ClientRegister";
import ClientRoot from "../pages/client/ClientRoot";

import Contact from "../pages/client/Contact/Contact";
import CompanyDashboard from "../pages/client/Home/CompanyDashboard/CompanyDashboard";
import Home from "../pages/client/Home/Home";
import Services from "../pages/client/Services/Services";
import LoanForm from "../pages/client/UserDashboard/LoanForm";
import UserDashboard from "../pages/client/UserDashboard/UserDashboard";


export const ROUTES = [
    {
        path: "/",
        element: <ClientRoot />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <ClientLogin />
            },
            {
                path: "register",
                element: <ClientRegister />
            },
            {
                path: "user-dashboard",
                element: <UserDashboard />
            },
            {
                path: "user-dashboard/loan-form",
                element: <LoanForm />
            },
            {
                path: "company-dashboard",
                element: <CompanyDashboard />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "service",
                element: <Services />
            },
            {
                path: "blogs",
                element: <Blogs />
            },
            {
                path: "blogdetail/:id",
                element: <BlogDetail />
            },
            {
                path: "about",
                element: <About />
            },

        ]
    },
    {
        path: "/admin",
        element: <AdminRoot />,
        children: [
            {
                index: true,
                element: <AdminDashboar />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "blog-add",
                element: <BlogAdd />
            },
            {
                path: "blog/edit/:id",
                element: <BlogEdits />
            },


        ]
    },
    {
        path: "admin/login",
        element: <AdminLogin />
    },
    {
        path: "*",
        element: <ErrorPage />
    },
]