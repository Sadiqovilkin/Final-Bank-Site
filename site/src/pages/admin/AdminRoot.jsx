import React, { useEffect, useState } from 'react'
import {Outlet, useNavigate} from 'react-router-dom';
import AdminHeader from '../../components/admin/Adminheader/AdminHeader';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useDataContext } from '../../context/Context';
const AdminRoot = () => {
  
  const {adminID} = useDataContext()
  // console.log(adminID);
  const navigate = useNavigate();
  useEffect(() => {
    if (adminID===null) {
      navigate('/admin/login');
    }
  }, [adminID]);
  return (
    <>
    <main style={{paddingTop:"70px"}}>
    <AdminHeader/>
    <Outlet />
    </main>
    </>
  )
}

export default AdminRoot