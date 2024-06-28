import React, { useEffect } from 'react'
import { useDataContext } from '../../../../context/Context';
import { useOutletContext } from 'react-router';

const CompanyDashboard = () => {
  const [setUserID, setLocalUserID,userID] = useOutletContext();
  const{sendMoney,userGetOne,oneUser}= useDataContext()

  useEffect(()=>{
    userGetOne(userID.Id)
  },[])
  return (
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
               <h2>3</h2>
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
            <div className="row">
              <div className="col-lg-9">
                <div className="activity">
                  <ul>
                    <li>Name:Togrul</li>
                    <li>Surname:Togrul</li>
                    <li>Email:Togrul</li>
                    <li>Phone:Togrul</li>
                    <li>Address:Togrul</li>
                    <li>Age:Togrul</li>
                  </ul>
                  <form action="">
                    <div>
                    <label htmlFor="">Mebleg</label>
                    <input type="text" placeholder='5000'/>
                    </div>
                    <div>
                    <label htmlFor="">Nece Ayliq</label>
                    <input type="number" placeholder='24' min={3} max={72}/>
                    </div>
                    <div>
                    <label htmlFor="">Faiz</label>
                    <input type="number" placeholder='15'   min={12} max={20}/>
                    </div>
                  </form>
                  <div className="btns">
                    <div className="btn btn-success">Accept</div>
                    <div className="btn btn-danger">Reject</div>
                  </div>
                </div>
                <div className="activity">
                  <ul>
                    <li>Name:Togrul</li>
                    <li>Surname:Togrul</li>
                    <li>Email:Togrul680@gmail</li>
                    <li>Phone:Togrul</li>
                    <li>Address:Togrul</li>
                    <li>Age:Togrul</li>
                  </ul>
                  <form action="">
                    <div>
                    <label htmlFor="">Mebleg</label>
                    <input type="text" placeholder='5000'/>
                    </div>
                    <div>
                    <label htmlFor="">Nece Ayliq</label>
                    <input type="number" placeholder='24' min={3} max={72}/>
                    </div>
                    <div>
                    <label htmlFor="">Faiz</label>
                    <input type="number" placeholder='15'   min={12} max={20}/>
                    </div>
                  </form>
                  <div className="btns">
                    <div className="btn btn-success">Accept</div>
                    <div className="btn btn-danger">Reject</div>
                  </div>
                </div>
                <div className="activity">
                  <ul>
                    <li>Name:Togrul</li>
                    <li>Surname:Togrul</li>
                    <li>Email:Togrul</li>
                    <li>Phone:Togrul</li>
                    <li>Address:Togrul</li>
                    <li>Age:Togrul</li>
                  </ul>
                  <form action="">
                    <div>
                    <label htmlFor="">Mebleg</label>
                    <input type="text" placeholder='5000'/>
                    </div>
                    <div>
                    <label htmlFor="">Nece Ayliq</label>
                    <input type="number" placeholder='24' min={3} max={72}/>
                    </div>
                    <div>
                    <label htmlFor="">Faiz</label>
                    <input type="number" placeholder='15'   min={12} max={20}/>
                    </div>
                  </form>
                  <div className="btns">
                    <div className="btn btn-success">Accept</div>
                    <div className="btn btn-danger">Reject</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default CompanyDashboard