import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom';
import Header from '../../components/client/ClientHeader/Header';
import useLocalStorage from '../../hooks/useLocalStorage';
import Footer from '../../components/client/Footer/Footer';
const ClientRoot = () => {
  const localID = JSON.parse(localStorage.getItem('userID'));
  const[localUserID, setLocalUserID] = useLocalStorage('userID', null);
  const [userID, setUserID] = useState(localID ? localID : null);
  const [locatin ,setLoc] = useState(false) 
  useEffect(()=>{
    if (window.location.href == 'http://localhost:5173/login' || window.location.href == 'http://localhost:5173/register') {
      setLoc(true)
    }
    else{
      setLoc(false)
    }
  },[])
  return (
   <>
   {locatin ? 
   <>
   <Header userID={userID}  setUserID={setUserID} setLocalUserID={setLocalUserID}/>
   <Outlet context={[setUserID, setLocalUserID,userID]} />
   </>:
   <>
    <Header userID={userID}  setUserID={setUserID} setLocalUserID={setLocalUserID}/>
   <Outlet context={[setUserID, setLocalUserID,userID]} />
   <Footer/>
   </>
   
   }
  
   
   </>
  )
}

export default ClientRoot