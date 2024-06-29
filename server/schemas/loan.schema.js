const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  email: String,
  phoneNumber: String,
  address: String,
  loanAmount: Number,
  loanPurpose: String,
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "declined"],
  },
  monthlyIncome: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  loanTerm: { type: Number, required: true },
  isEmployerapproved: {
    type: Boolean,
    default: false,
  },
  interest: Number,
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
