const UserModel = require("../models/user.model");
const sendVerifyEmail = require("../helpers/sendMail.js");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../helpers/generateAccessToken.js");
const Loan = require("../schemas/loan.schema.js");


const user_controller = {
  getAll: async (req, res) => {
    const users = await UserModel.find();

    if (users.length > 0) {
      res.status(200).send({
        message: "success",
        data: users,
      });
    } else {
      res.send({
        message: "not found",
        data: null,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    let user;
    try {
      user = await UserModel.findById(id);
    } catch (error) {
      res.send({ error: error });
    }
    if (user) {
      res.status(200).send({
        message: "success",
        data: user,
      });
    } else {
      res.send({
        message: "no content",
        data: null,
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    let response;
    try {
      response = await UserModel.findByIdAndDelete(id);
    } catch (error) {
      res.send({
        error: error,
      });
    }
    res.send({
      message: "deleted",
      response: response,
    });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const response = await UserModel.findByIdAndUpdate(id, req.body);
    res.send({
      message: "updated",
      response: response,
    });
  },
  register: async (req, res) => {
    try {
      const {email } = req.body;
      const duplicateEmail = await UserModel.find({ email: email });
      let message = "";
      if (duplicateEmail.length > 0) {
        message = "email already exists";
      }
      if (message.length > 0) {
        res.send({
          error: true,
          message: message,
        });
      } else {
        let newUser = { ...req.body };
        let saltRounds = 10;

        bcrypt
          .genSalt(saltRounds)
          .then((salt) => bcrypt.hash(req.body.password, salt))
          .then(async (hash) => {
            newUser.password = hash;
            const user = new UserModel(newUser);
            //JWT TOKEN
            const token = jwt.sign(
              { email: newUser.email},
              process.env.PRIVATE_KEY,
              { expiresIn: "1d" }
            );
            sendVerifyEmail(newUser.email, token);
            await user.save();
            res.send({
              message: "posted",
              error: false,
              data: user,
            });
          });
      }
    } catch (error) {
      res.status(500).send({
        message: error,
        error: true,
      });
    }
  },
  user_login: async (req, res) => {
    const user = await UserModel.findOne({
      email: req.body.email,
      // role: "client" || "directory",
    });
    if (user) {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, response) {
          if (response) {
            if (user.isVerified == true) {
              const token = generateAccessToken(user);
              res.send({
                message: "signed in successfully",
                auth: true,
                user: user,
                token: token,
              });
            } else {
              res.send({
                message: "verify your email",
                auth: false,
              });
            }
          } else {
            res.send({
              message: "email or password is incorrect",
              auth: false,
            });
          }
        }
      );
    } else {
      res.send({
        message: "no such user",
        auth: false,
      });
    }
  },
  admin_login: async (req, res) => {
    const user = await UserModel.findOne({
      email: req.body.email,
      role: "admin",
    });
    if (user) {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, response) {
          if (response) {
            if (user.isVerified == true) {
              const token = generateAccessToken(user);
              res.send({
                message: "signed in successfully",
                auth: true,
                user: user,
                token: token,
              });
            } else {
              res.send({
                message: "verify your email",
                auth: false,
              });
            }
          } else {
            res.send({
              message: "email or password is incorrect",
              auth: false,
            });
          }
        }
      );
    } else {
      res.send({
        message: "no such user",
        auth: false,
      });
    }
  },

  verify: async (req, res) => {
    const{token} = req.params;
    const validToken = jwt.verify(token, process.env.PRIVATE_KEY);
    if(validToken){
      const{email} = validToken;
      const user = await UserModel.findOne({email:email});
      if(user){
        await UserModel.findByIdAndUpdate(user._id,{isVerified: true});
        res.redirect('http://localhost:5173/login');
        return;
      }
      else{
        res.send({
          message:'no such user'
        })
      }
    }
    else{
      res.send({
        message:'invalid token',
        auth: false
      })
    }
    res.send({message:'hey'})
  },
  add_loan_form: async (req, res) => {
    try {
      const loan = new Loan(req.body);
      await loan.save();
      res.status(201).send({ message: 'Loan application submitted successfully', loan });
    } catch (error) {
      res.status(500).send({ message: 'Error submitting loan application', error });
    }
  },
  all_loans : async (req, res)=>{
    try {
      const loan = await Loan.find({});
      res.status(201).send(loan);
    } catch (error) {
      res.status(500).send({ message: 'Error ', error });
    }
  },
  // loan_accept: async (req, res)=>{
  //   try {
  //     const loanId = req.body.loanID
  //     const loan = await Loan.findOne({ _id: loanId });
  //     const userId = loan.userId
  //     const user = await UserModel.findOne({ _id: userId });
  //     user.balance += loan.loanAmount;
  //     user.loans += loan.loanAmount;
  //     loan.status = "approved"
  //     await user.save();
  //     await loan.save();
  
  //     res.status(201).send("Loan Succesfully Added!");
  //   } catch (error) {
  //     res.status(500).send({ message: 'Error ', error });
  //   }
  // },
  loan_decline: async (req, res)=>{
    try {
      const loanId = req.body.loanID
      const loan = await Loan.findOne({ _id: loanId });
      loan.status = "declined"
      await loan.save();
  
      res.status(201).send("Loan Declined!");
    } catch (error) {
      res.status(500).send({ message: 'Error ', error });
    }
  },
  loan_approve_employer: async (req, res)=>{
    try {
      const loanId = req.body.loanID
      const loan = await Loan.findOne({ _id: loanId });
      loan.isEmployerapproved = true
      loan.loanAmount = req.body.amount
      loan.loanTerm = req.body.term
      loan.interest = req.body.interest
      console.log(req.body);
      await loan.save();
      
      res.status(201).send("Loan Declined!");
    } catch (error) {
      res.status(500).send({ message: 'Error ', error });
    }
  },
  users_loan: async (req, res)=>{
    try {
      const loanId = req.body.loanID
      const loan = await Loan.findOne({ _id: loanId });
      loan.status = "declined"
      await loan.save();
  
      res.status(201).send("Loan Declined!");
    } catch (error) {
      res.status(500).send({ message: 'Error ', error });
    }
  },
};

module.exports = user_controller;
