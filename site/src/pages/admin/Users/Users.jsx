import React, { useEffect, useState } from 'react'
import { useDataContext } from '../../../context/Context'
import controller from '../../../services/requests';
import { endpoints } from '../../../services/constant';

const Users = () => {
  const {userID,setUserID , setLocalUserID} = useDataContext()
  // console.log(users);
  const [users , setUsers]=useState([])
  const [role , setRole] = useState("")
  const [id , setId] = useState("")
  function getUsers() {
    controller.getAll(endpoints.Users).then((res)=>{
      setUsers(res.data)
    })
  }
  useEffect(()=>{
    getUsers()
  },[])
  const safeValue = (value) => isNaN(value) ? 0 : value;
  async function userDelete(id) {
    await controller.delete(endpoints.Users , id)
    if (userID.Id == id ) {
      setLocalUserID(null)
      setUserID(null)
    }
    getUsers()
  }

async function changeRole( id, role) {
    await controller.patch(endpoints.Users , id , {role})
    getUsers()
  }
  return (
    <section>
      


<div className="modal " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" >
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <select name="" id="" onChange={(e)=>{
          // console.log(e.target.value);
          setRole(e.target.value)
        }}>
          <option value="admin">Admin</option>
          <option value="directory">Employer</option>
          <option value="client">Client</option>
        </select>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>{
          changeRole(id , role)
        }}>Save changes</button>
      </div>
    </div>
  </div>
</div>


      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Balance</th>
                  <th>Loans</th>
                  <th>Verified</th>
                  <th>Gender</th>
                  <th>UserId</th>
                  <th>City</th>
                  <th>Change Role</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user,idx)=>{
                  return(
                    <tr key={idx}>
                       <th>{idx}</th>
                  <th>{user.name}</th>
                  <th>{user.surname}</th>
                  <th>{user.email}</th>
                  <th>{user.role}</th>
                  <th>{Math.round((safeValue(user.balance) + Number.EPSILON) * 100) / 100 + "$"}</th>
                  <th>{Math.round((safeValue(user.loans) + Number.EPSILON) * 100) / 100 + "$"}</th>
                  <th>{user.isVerified ? "True" : "False"}</th>
                  <th>{user.gender}</th>
                  <th>{user.userId}</th>
                  <th>{user.region}/{user.city}</th>
                  <th>
                    <button className='btn btn-info text-white' onClick={()=>setId(user._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">ChangeRole</button>
                    </th>
                  <th>
                    <button className='btn btn-danger' onClick={()=>userDelete(user._id)}>Delete</button>
                    </th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Users