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
import Swal from 'sweetalert2';
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
  // console.log(Object(oneUser));
  const formikuptdate = useFormik({
    initialValues: {
      name: oneUser?.name,
      surname: oneUser?.surname,
      address: oneUser?.address,
      city: oneUser?.city,
      region: oneUser?.region,
      phone: oneUser?.phone,
      dateofbirth: oneUser?.dateofbirth,
      email: oneUser?.email,
      image: oneUser?.image,
      companyName: oneUser?.companyName,
      seniority: oneUser?.seniority,
    },
    enableReinitialize: true,
    onSubmit:(values)=>{
  
      controller.patch(endpoints.Users , oneUser._id , {name:values.name,surname:values.surname,address:values.address,city:values.city,region:values.region , phone:values.phone , dateofbirth:values.dateofbirth, email:values.email  , image:values.image , companyName:values.companyName , seniority:values.seniority , })
    //   console.log(oneUser.name);
    //  console.log("newUsers", values);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User succses Sign Up",
        showConfirmButton: false,
        timer: 1500
      })
      getUser()
      formikuptdate.resetForm()  
    },
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
      <div className="modal fade" id="uptdateModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Loan Modal</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={formikuptdate.handleSubmit}>
        <fieldset>
          <legend>Personal Informations</legend>
          <div className="fulnames d-flex gap-3">
                <input placeholder="name" className="form-control w-50 my-2" id="name" name="name" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.name} />
                {formikuptdate.errors.name ? <div style={{ color: "red" }}>{formikuptdate.errors.name}</div> : null}
                <input placeholder="surname" className="form-control w-50 my-2" id="surname" name="surname" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.surname} />
                {formikuptdate.errors.surname ? <div style={{ color: "red" }}>{formikuptdate.errors.surname}</div> : null}
              </div>
              <input placeholder="address" className="form-control  my-2" id="address" name="address" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.address} />
                {formikuptdate.errors.address ? <div style={{ color: "red" }}>{formikuptdate.errors.address}</div> : null}
                <input placeholder="city" className="form-control  my-2" id="city" name="city" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.city} />
                {formikuptdate.errors.city ? <div style={{ color: "red" }}>{formikuptdate.errors.city}</div> : null}
                <input placeholder="region" className="form-control  my-2" id="region" name="region" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.region} />
                {formikuptdate.errors.region ? <div style={{ color: "red" }}>{formikuptdate.errors.region}</div> : null}
                  <div className="d-flex gap-3">
                  <input placeholder="phone" className="form-control w-50  my-2" id="phone" name="phone" type="tel" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.phone} />
                {formikuptdate.errors.phone ? <div style={{ color: "red" }}>{formikuptdate.errors.phone}</div> : null}
                <input placeholder="dateofbirth" className="form-control w-50  my-2" id="dateofbirth" name="dateofbirth" type="date" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.dateofbirth} />
                {formikuptdate.errors.dateofbirth ? <div style={{ color: "red" }}>{formikuptdate.errors.dateofbirth}</div> : null}
                  </div>
                <input placeholder="email" className="form-control  my-2" id="email" name="email" type="email" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.email} />
                {formikuptdate.errors.email ? <div style={{ color: "red" }}>{formikuptdate.errors.email}</div> : null}
              
               <input placeholder="image" className="form-control  my-2" id="image" name="image" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.image} />
                {formikuptdate.errors.image ? <div style={{ color: "red" }}>{formikuptdate.errors.image}</div> : null}
             
        </fieldset>



                <fieldset >
                  <legend>Company Informations </legend>
                <input placeholder="companyName" className="form-control  my-2" id="companyName" name="companyName" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.companyName} />
                {formikuptdate.errors.companyName ? <div style={{ color: "red" }}>{formikuptdate.errors.companyName}</div> : null}
              
                <input placeholder="seniority" className="form-control  my-2" id="seniority" name="seniority" type="text" onChange={formikuptdate.handleChange} defaultValue={formikuptdate.values.seniority} />
                {formikuptdate.errors.seniority ? <div style={{ color: "red" }}>{formikuptdate.errors.seniority}</div> : null}

                </fieldset>
                
                
                
                
              
              
              
              
              
              <button type='submit' className='btn btn-primary'>Uptdate</button>
            </form>
                    </div>
                </div>
            </div>
        </div>
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
                    <p>{oneUser.name} {oneUser.surname} </p>
                    <button data-bs-target="#uptdateModalToggle" data-bs-toggle="modal" className='btn btn-info my-2'>Profile Uptdate</button>
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
                            {x.isEmployerapproved ? <input type="text" value={`Ayliq Odenis:${Math.round((safeValue((x.loanAmount + (x.loanAmount * x.interest / 100)) / x.loanTerm) + Number.EPSILON) * 100) / 100}`} disabled /> : <input type="text" value={`Ayliq Odenis : Hesablanir`} disabled />}
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