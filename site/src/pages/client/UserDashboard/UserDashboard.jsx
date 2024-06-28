import React, { useEffect } from 'react'
import Hero from '../../../components/client/Hero/Hero'
import { useFormik } from 'formik';
import { useDataContext } from '../../../context/Context';
import { useOutletContext } from 'react-router-dom';
import controller from '../../../services/requests';
import { endpoints } from '../../../services/constant';
import { useState } from 'react';

const UserDashboard = () => {
  const [setUserID, setLocalUserID,userID] = useOutletContext();
  const{sendMoney,userGetOne}= useDataContext()
  const [oneUser, setOneUser] = useState([]);
  function getUser() {
     controller.getOne(endpoints.Users , userID.Id).then((res)=>{
      setOneUser(res.data)
    })
  }
  const formik = useFormik({
    initialValues:{
      userId:"",
      money:""
    },
    onSubmit: async (values)=>{
      console.log('send id values: ',values.userId);
      await sendMoney(userID.Id , values.userId , Number(values.money))
      getUser()
      formik.resetForm()
    }
  })
  useEffect(()=>{
    getUser()
  },[])
  // console.log(oneUser);
  return (
    <main>
      <Hero text={"User Dashboard"}/>
      <section id='userDashboard'>
        <div className="user_loan_profile">
        <div className="container">
        <div className="row">
            <div className="col-lg-4">
              <div className="profile">
                <img src={oneUser.image} alt="" />
                <div className="text">
                  <h2>Welcome back!</h2>
                  <p>We're happy to help you grow your business with Loanly Working Capital.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="loan_box">
               <div className="text">
               <h2>{oneUser.loans}</h2>
                <p>Loans</p>
               </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="loan_box">
                <div className="text">
                <h2>{oneUser.balance}</h2>
                <p>Total Balance</p>
                </div>
                <div className="text">
                  <h2>{oneUser.userId}</h2>
                  <p>User Id</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="user_profile">
          <div className="container py-4">
            <div className="row">
              <div className="col-lg-4 border-right">
                <div className="loan_detail">
                  <h2>Loan Details</h2>
                  <ul>
                    <li>
                      <span>$10.000</span>
                      <p>Outstanding balance</p>
                    </li>
                    <li>
                      <span>$10.000</span>
                      <p>Outstanding balance</p>
                    </li>
                  </ul>
                  <button>Make Payment</button>
                </div>
                <div className="send_money">
                <h2>Send Money</h2>
                  <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="">User Id:</label>
                    <input onChange={formik.handleChange} value={formik.values.userId} name='userId' className='form-contro' type="text" placeholder='AZ0000' />
                    <br />
                    <label htmlFor="">Money:</label>
                    <input onChange={formik.handleChange} value={formik.values.money}  name='money' className='form-contro' type="tel" placeholder='$1.000.000'  />
                    <br />
                    <button type='submit'>Send</button>
                  </form>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="activity">

                <div className="message_card">
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="loan_message">
                      <input type="text" value={`Mebleg : 5000`} disabled />
                      <input type="text" value={`Nece Ayliq : 16`} disabled />
                      <input type="text" value={`Faiz : 17`} disabled />
                      <input type="text" value={`Ayliq Odenis:450`} disabled />
                      <input type="text" value={`Bank Status : Yoxlanisdadir`} disabled className="time" />
                    </div>
                
                  </div>
                  <div className="col-6">
                  <div className="loan_btn">
                      <button className="btn btn-success">Accept</button>
                      <button className="btn btn-danger">Reject</button>
                    </div>
                    <div className="loan_status my-2">
                      Status: <span className='success'>Succsess</span> <span>Pending</span>  <span className='reject'>Rejected</span>
                    </div>
                  </div>
                </div>
                </div>
                <div className="message_card ">
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="loan_message">
                      <input type="text" value={`Mebleg : 5000`} disabled />
                      <input type="text" value={`Nece Ayliq : 16`} disabled />
                      <input type="text" value={`Faiz : 17`} disabled />
                      <input type="text" value={`Ayliq Odenis:450`} disabled />
                      <input type="text" value={`Bank Status : Yoxlanisdadir`} disabled className="time" />
                    </div>
                
                  </div>
                  <div className="col-6">
                  <div className="loan_btn">
                      <button className="btn btn-success">Accept</button>
                      <button className="btn btn-danger">Reject</button>
                    </div>
                    <div className="loan_status my-2">
                      Status: <span className='success'>Succsess</span> <span>Pending</span>  <span className='reject'>Rejected</span>
                    </div>
                  </div>
                </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default UserDashboard