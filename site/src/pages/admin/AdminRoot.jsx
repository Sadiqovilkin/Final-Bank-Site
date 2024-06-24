import React, { useState } from 'react'
import {Outlet} from 'react-router-dom';
import AdminHeader from '../../components/admin/Adminheader/AdminHeader';
import useLocalStorage from '../../hooks/useLocalStorage';
const AdminRoot = () => {
  
  const localID = JSON.parse(localStorage.getItem('adminID'));
  const[localAdminID, setLocalAdminID] = useLocalStorage('adminID', null);
  const [adminID, setAdminID] = useState(localID ? localID : null);
  console.log(adminID);
  return (
    <>
    <main style={{paddingTop:"70px"}}>
    <AdminHeader/>
    <Outlet context={[setAdminID, setLocalAdminID,adminID]}/>
    </main>
    </>
  )
}

export default AdminRoot