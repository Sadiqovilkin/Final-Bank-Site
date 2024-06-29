import React, { useEffect, useState } from 'react'
import { useDataContext } from '../../../../context/Context';
import { useOutletContext } from 'react-router';
import axios from 'axios';

const CompanyDashboard = () => {
  const [setUserID, setLocalUserID,userID] = useOutletContext();
  const{sendMoney,userGetOne,oneUser}= useDataContext()
  const [Loans, setLoans] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const decline_loan = async(loanId)=>{
    await axios.patch("http://localhost:5050/api/loan_decline",{loanID:loanId})
  }
  const approve_loan = async(loanId,amount,term,interest)=>{
    
    await axios.patch("http://localhost:5050/api/loan_approve_employer",{loanID:loanId,amount, term, interest})
  }

  const getLoans = async () => {
    const res = await axios.get("http://localhost:5050/api/all_loans")
    setLoans(res.data);
    setIsloading(false);
  };




  useEffect(()=>{
    userGetOne(userID.Id)
    getLoans();
  },[])
  return (
<>
{isloading ? (<>Loading...</>):
(
  <>

    <section id='company'>
      <div className="user_loan_profile">
        <div className="container">
        <div className="row">
            <div className="col-lg-4">
              <div className="profile">
                <img src={oneUser.image} alt="" />
                <div className="text">
                  <h2 >{userID.role}</h2>
                  <p>{oneUser.name} {oneUser.surname}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="loan_box">
               <div className="text">
               <h2>{Loans.length}</h2>
                <p>Message count </p>
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
                  <p>Employer Id</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="company_reguests">
          <div className="container">
            <h1>Loans Messages:</h1>
            <div className="row justify-content-center">
              <div className="col-lg-9">
              {Loans &&
            Loans.map((item) => (
                <div key={item._id} className="activity">
                <ul>
                  <li>UserId: {item.userId}</li>
                  <li>loanAmount: {item.loanAmount}</li>
                  <li>loanPurpose: {item.loanPurpose}</li>
                  <li>status: {item.status}</li>
                  <li>monthlyIncome: {item.monthlyIncome}</li>
                  <li>employmentStatus: {item.employmentStatus}</li>
                  <li>loanTerm: {item.loanTerm}</li>
                </ul>
                  <form action="">
                    <div>
                    <label htmlFor="">Mebleg</label>
                    <input type="text" placeholder='0 - 1000000' defaultValue={item.loanAmount} onChange={(e)=>item.loanAmount = Number(e.target.value)}/>
                    </div>
                    <div>
                    <label htmlFor="">Muddet</label>
                    <input type="number" placeholder='3 - 72' defaultValue={item.loanTerm} onChange={(e)=>item.loanTerm = Number(e.target.value)} min={3} max={72}/>
                    </div>
                    <div>
                    <label htmlFor="">Faiz</label>
                    <input type="number" placeholder='12% - 20 %' onChange={(e)=>item.interest = Number(e.target.value)}   min={12} max={20}/>
                    </div>
                  </form>
                  <div className="btns">
                    <div className="btn btn-success" onClick={()=>approve_loan(item._id,item.loanAmount,item.loanTerm,item.interest)}>Accept</div>
                    <div className="btn btn-danger" onClick={()=>decline_loan(item._id)}>Reject</div>
                  </div>
                </div>

               


            ))}

              </div>
            </div>
          </div>
        </div>
    </section>
  
  
  </>
)
}
</>

  )
}

export default CompanyDashboard