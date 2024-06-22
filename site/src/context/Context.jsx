import { useParams } from "react-router";
import axios from "axios"
import { createContext, useContext, useState, useEffect } from "react";
import { endpoints ,BASE_URL } from "../services/constant";


const dataContext = createContext(null);

const DataContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [oneUser, setOneUser] = useState([]);

    // User Reguests
    const userGetAll = async () => {
        await axios.get(BASE_URL  + `/${endpoints.Users}`).then((res) => {
            // console.log('res data: ',res.data)
            setUsers(res.data.data);
        });
    };
    useEffect(() => {
        userGetAll();
    }, []);
    const userGetOne = async (id) => {
        await axios.get(BASE_URL + `/${endpoints.Users}` + `/${id}`).then((res) => {
            setOneUser(res.data.data);
        });
    };
    const userDelete = async (id) => {
        await axios.delete(BASE_URL + `/${endpoints.Users}` + `/${id}`).then((res) => {
            try {
                const deleteData = users.find((x) => x._id == id);
                users.splice(users.indexOf(deleteData), 1);
                setUsers([...users]);
            } catch (error) {
                console.log(error);
            }
        });
    };
    const userPost = async (payload) => {
        await axios.post(BASE_URL+ `/${endpoints.Users}`, payload).then(() => {
            setUsers([...users, payload]);
        });
    };

    const sendMoney = async (id , senduserId , money)=>{
        const mainUser =  users.find((x)=> x._id == id)
        const sendUser = users.find((x)=> x.userId == senduserId)
        // console.log('user 1: ',mainUser);
        // console.log('user 2: ',sendUser);
        mainUser.balance -= money
        sendUser.balance += money 
       await axios.patch(BASE_URL + `/${endpoints.Users}` + `/${id}`, {balance: mainUser.balance})
       await axios.patch(BASE_URL + `/${endpoints.Users}` + `/${sendUser._id}`, {balance: sendUser.balance})
    }


    const values = {users,oneUser,sendMoney ,userGetAll,userGetOne,userDelete,userPost};
    return <dataContext.Provider value={values}>{children}</dataContext.Provider>;
};

const useDataContext = () => useContext(dataContext);

export { useDataContext, DataContextProvider };