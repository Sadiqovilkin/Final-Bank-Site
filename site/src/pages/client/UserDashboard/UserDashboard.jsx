import React, { useEffect } from 'react'
import Hero from '../../../components/client/Hero/Hero'
import { useFormik } from 'formik';
import { useDataContext } from '../../../context/Context';
import { Link, useOutletContext } from 'react-router-dom';
import controller from '../../../services/requests';
import { endpoints } from '../../../services/constant';
import { useState } from 'react';
import axios from 'axios';
import Payment from "./PaymentForm";
const UserDashboard = () => {
  const [setUserID, setLocalUserID, userID] = useOutletContext();
  const { sendMoney, userGetOne } = useDataContext()
  const [oneUser, setOneUser] = useState([]);
  const [userLoan, setUserLoan] = useState([])
  function getMessages() {
    controller.getAll("all_loans").then((res) => {
      // console.log(userID);
      // console.log(res.filter((x)=>x.userId == userID.Id));
      setUserLoan(res.filter((x) => x.userId == userID.Id))
    })
  }
  function getUser() {
    controller.getOne(endpoints.Users, userID.Id).then((res) => {
      setOneUser(res.data)
    })
  }
  const formik = useFormik({
    initialValues: {
      userId: "",
      money: ""
    },
    onSubmit: async (values) => {
      // console.log('send id values: ',values.userId);
      await sendMoney(userID.Id, values.userId, Number(values.money))
      getUser()
      formik.resetForm()
    }
  })
  const handlePaymentSuccess = (newBalance) => {
    setOneUser((prevState) => ({
      ...prevState,
      balance: newBalance,
    }));
  };

  const user_loan_accept = async (loanID) => {
    await axios.patch("http://localhost:5050/api/user_loan_accept", { loanID });
    getMessages();
    getUser();
  };

  const user_loan_decline = async (loanID) => {
    await axios.patch("http://localhost:5050/api/loan_decline", { loanID });
    getMessages();
    getUser();
  };

  const monthly_loan_payment = async (loanId, paymentScheduleId) => {
    await axios.patch("http://localhost:5050/api/monthly_loan_payment", {
      loanId,
      paymentScheduleId,
      userId: userID.Id,
    });
    getMessages();
    getUser();
  };
  useEffect(() => {
    getUser()
    getMessages()
  }, [])

  const safeValue = (value) => isNaN(value) ? 0 : value;

  // console.log(oneUser);
  return (
    <main>
      <Hero text={"User Dashboard"} />
      <section id='userDashboard'>
        <div className="user_loan_profile">
          <div className=" container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-2">
                <div className="profile">
                  <img src={oneUser.image} alt="" />
                  <div className="text">
                    <h2>Welcome back! </h2>
                    <p>{oneUser.name} {oneUser.surname}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <div className="loan_box">
                  <div className="text">
                    <h2>{Math.round((safeValue(oneUser.loans) + Number.EPSILON) * 100) / 100}</h2>
                    <p>Loans</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6  col-md-6 col-sm-6">
                <div className="loan_box">
                  <div className="text w-50">
                    <h2>{ Math.round((safeValue(oneUser.balance) + Number.EPSILON) * 100) / 100}</h2>
                    <p>Total Balance</p>
                  </div>
                  <div className="text w-50 ">
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
                  {/* Modal  */}
              <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Loan Modal</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    </div>
                    <div className="modal-body">
                  <div className="accordion" id="accordionExample">
                    {userLoan &&
                    userLoan.map((item , idx) =>
                    
                      item.paymentSchedule ? (
                        
                        <div className="accordion-item" key={item._id}>
                          <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded="true" aria-controls="collapseOne">
        User Loan {idx}
      </button>
    </h2>
    <div id={`collapse${idx}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       
      {item.paymentSchedule.map((schedule) => {
  const isPaid = schedule.isPaid;
  const loanClass = isPaid ? 'loan_accardion payed' : 'loan_accardion';
  return (
    <div className={loanClass} key={schedule._id}>
      <div className='texts'>
        <span>{schedule.monthName}</span> -
        <span>{new Date(schedule.date).toLocaleDateString()}</span> -
        <span className='text-danger'>{Math.round((safeValue(item.monthlyPayment) + Number.EPSILON) * 100) / 100 + "$"}</span>
      </div>
      <button
        onClick={() => monthly_loan_payment(item._id, schedule._id)}
        disabled={isPaid}
        className={isPaid ? "btn btn-light" : ""}
      >
        Pay
      </button>
    </div>
  );
})}
      </div>
    </div>
                        </div>
                      ) : (
                        <></>
                      )
                    )} 
 
 </div> 
                    </div>
                </div>
            </div>
        </div>
{/*                  
                  <ul>
                    <li>
                      <span>$10.000</span>
                      <p>Outstanding balance</p>
                    </li>
                    <li>
                      <span>$10.000</span>
                      <p>Outstanding balance</p>
                    </li>
                  </ul> */}

                  {/* {userLoan &&
                    userLoan.map((item) =>
                    
                      item.paymentSchedule ? (
                        
                        <div className="accordion-item" key={item._id}>
                          {item.paymentSchedule.map((schedule) => (
                            <div key={schedule._id}>
                              {schedule.monthName} -
                              {new Date(schedule.date).toLocaleDateString()} -
                              {item.monthlyPayment + "$"}
                              <button
                                onClick={() =>
                                  monthly_loan_payment(item._id, schedule._id)
                                }
                                disabled={schedule.isPaid}
                                className={schedule.isPaid ? "btn btn-light" : ""}
                              >
                                Pay
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )
                    )}  */}
                  {/* <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first</button> */}
                  <button className='btn' data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Make Payment</button>
                </div>
                <div className="send_money">
                  <h2>Send Money</h2>
                  <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="">User Id:</label>
                    <input onChange={formik.handleChange} value={formik.values.userId} name='userId' className='form-contro' type="text" placeholder='AZ0000' />
                    <br />
                    <label htmlFor="">Money:</label>
                    <input onChange={formik.handleChange} value={formik.values.money} name='money' className='form-contro' type="tel" placeholder='$1.000.000' />
                    <br />
                    <button type='submit'>Send</button>
                  </form>
                </div>
                <div className="create_newLoans">
                  <Link to={"/user-dashboard/loan-form"}> New Loans Forms</Link>
                </div>
                <Payment onPaymentSuccess={handlePaymentSuccess} />
              </div>
              <div className="col-lg-8">
                <div className="activity">
                  {userLoan && userLoan.map((x) =>

                    <div className="message_card" key={x._id}>
                      <div className="row align-items-center">
                        <div className="col-6">
                          <div className="loan_message">
                            <input type="text" value={`Mebleg : ${x.loanAmount}`} disabled />
                            <input type="text" value={`Nece Ayliq : ${x.loanTerm}`} disabled />
                            <input type="text" value={`Faiz : ${x.interest}`} disabled />
                            {x.isEmployerapproved ? <input type="text" value={`Ayliq Odenis:${(x.loanAmount + (x.loanAmount * x.interest / 100)) / x.loanTerm}`} disabled /> : <input type="text" value={`Ayliq Odenis : Hesablanir`} disabled />}
                            <input type="text" value={`Bank Status : ${x.isEmployerapproved ? "Qebul Edildi" : "Yoxlanisdadir"}`} disabled className="time" />
                          </div>

                        </div>
                        <div className="col-6">
                          {x.isEmployerapproved && x.status == "pending" ? <div className="loan_btn">
                            <button className="btn btn-success" onClick={() => user_loan_accept(x._id)}>Accept</button>
                            <button className="btn btn-danger" onClick={() => user_loan_decline(x._id)}>Reject</button>
                          </div> : <></>}
                          <div className="loan_status my-2">
                            {/* x.isEmployerapproved && */}
                            Status: {x.status == "pending" ? <> <span>Pending</span> </> : x.status == "approved" ? <span className='success'>Succsess</span> : <span className='declined'>Rejected</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                  )}

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