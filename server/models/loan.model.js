const mongoose = require("mongoose");
const loanSchema = require("../schemas/loan.schema");

const LoanModel = mongoose.model("Loan", loanSchema);

module.exports = LoanModel;