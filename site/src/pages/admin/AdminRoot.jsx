import React from 'react'
import {Outlet} from 'react-router-dom';
import AdminHeader from '../../components/admin/Adminheader/AdminHeader';
const AdminRoot = () => {
  return (
    <>
    <main style={{paddingTop:"70px"}}>
    <AdminHeader/>
    <Outlet/>
    </main>
    </>
  )
}

export default AdminRoot