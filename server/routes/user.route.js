const express = require("express");
const user_router = express.Router();
const controller = require("../controllers/user.controller");

user_router.get("/api/users", controller.getAll);
user_router.get("/api/users/:id", controller.getOne);
user_router.delete("/api/users/:id", controller.delete);
user_router.patch("/api/users/:id", controller.update);
user_router.post("/api/users", controller.register);
user_router.post("/api/login", controller.user_login);
user_router.post("/api/adminlogin", controller.admin_login);
user_router.get("/api/verify/:token", controller.verify);
user_router.post("/api/loan", controller.add_loan_form);
user_router.get("/api/all_loans", controller.all_loans);
user_router.patch("/api/loan_decline", controller.loan_decline);
user_router.patch("/api/loan_approve_employer", controller.loan_approve_employer);


module.exports = user_router;
