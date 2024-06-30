const express = require("express");
const loan_router = express.Router();
const controller = require("../controllers/loan.controller");


loan_router.post("/api/loan", controller.add_loan_form);
loan_router.get("/api/all_loans", controller.all_loans);
loan_router.patch("/api/loan_decline", controller.loan_decline);
loan_router.patch("/api/loan_approve_employer", controller.loan_approve_employer);
loan_router.post("/api/pay", controller.pay_balance);
loan_router.patch("/api/user_loan_accept", controller.user_loan_accept);
loan_router.patch("/api/monthly_loan_payment", controller.monthly_loan_payment);


module.exports = loan_router;
