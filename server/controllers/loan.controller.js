const UserModel = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
const Loan = require("../models/loan.model");
const stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');
const moment = require('moment');

const generatePaymentSchedule = (loanTerm, startDate) => {
    const schedule = [];
    const startMoment = moment(startDate).add(1, 'months'); // First payment next month

    for (let i = 0; i < loanTerm; i++) {
        const paymentDate = startMoment.clone().add(i, 'months');
        schedule.push({
            monthName: paymentDate.format('MMMM'),
            date: paymentDate.toDate(),
            isPaid: false
        });
    }

    return schedule;
};

const makeMonthlyLoanPayment = async (loanId, paymentScheduleId, userId) => {
    try {
        const loan = await Loan.findById(loanId);
        // console.log("Loan",loan);
        if (!loan) {
            throw new Error("Loan not found");
        }

        const user = await UserModel.findById(userId);
        // console.log("user",user);
        if (!user) {
            throw new Error("User not found");
        }

        // console.log(loan.paymentSchedule);
        const paymentSchedule = loan.paymentSchedule.find(schedule => schedule._id.toString() === paymentScheduleId);;
        if (!paymentSchedule) {
            throw new Error("Payment schedule not found");
        }

        if (user.balance < loan.monthlyPayment) {
            throw new Error("Insufficient balance to make the payment");
        }

        // Deduct the monthly payment from the user's balance
        user.balance -= loan.monthlyPayment;
        user.loans -= loan.monthlyPayment;
        await user.save();

        // Update the payment schedule
        paymentSchedule.isPaid = true;
        await loan.save();

        return {
            success: true,
            message: "Payment made successfully",
            newBalance: user.balance,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const loan_controller = {
    add_loan_form: async (req, res) => {
        console.log("addLoan");
        try {
            const loan = new Loan(req.body);
            await loan.save();
            res.status(201).send({ message: 'Loan application submitted successfully', loan });
        } catch (error) {
            res.status(500).send({ message: 'Error submitting loan application', error });
        }
    },
    all_loans: async (req, res) => {
        try {
            const loan = await Loan.find({});
            res.status(201).send(loan);
        } catch (error) {
            res.status(500).send({ message: 'Error ', error });
        }
    },

    loan_decline: async (req, res) => {
        try {
            const loanId = req.body.loanID
            const loan = await Loan.findOne({ _id: loanId });
            if (loan.status !== "pending") {
                return 0;
            }
            loan.status = "declined"
            await loan.save();

            res.status(201).send("Loan Declined!");
        } catch (error) {
            res.status(500).send({ message: 'Error ', error });
        }
    },
    loan_approve_employer: async (req, res) => {
        try {
            const loanId = req.body.loanID
            const loan = await Loan.findOne({ _id: loanId });
            if (loan.status !== "pending" || loan.isEmployerapproved === true) {
                return 0;
            }
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
    users_loan: async (req, res) => {
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
    pay_balance: async (req, res) => {
        const { amount, id, userId } = req.body;

        if (!amount || !id || !userId) {
            return res.json({ success: false, message: 'Missing required fields' });
        }

        try {
            const payment = await stripe.paymentIntents.create({
                amount: amount * 100, // Stripe amount is in cents
                currency: 'usd',
                description: 'Account Balance Recharge',
                payment_method: id,
                confirm: true,
                return_url: 'https://your-website.com/payment-success', // Specify your return URL here
            });

            console.log('Payment response:', payment);

            if (payment.status === 'succeeded') {
                const user = await UserModel.findById(userId);
                if (!user) {
                    return res.json({ success: false, message: 'User not found' });
                }

                user.balance += amount;
                await user.save();

                res.json({ success: true, message: 'Payment successful', balance: user.balance });
            } else {
                res.json({ success: false, message: 'Payment failed' });
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            res.json({ success: false, message: error.message });
        }
    },
    user_loan_accept: async (req, res) => {
        try {
            const loanId = req.body.loanID
            const loan = await Loan.findOne({ _id: loanId });
            if (loan.status !== "pending") {
                return 0;
            }
            const userId = loan.userId
            const user = await UserModel.findOne({ _id: userId });
            user.balance += loan.loanAmount;
            user.loans += (loan.loanAmount + (loan.loanAmount * (loan.interest / 100)));
            loan.status = "approved"
            loan.monthlyPayment = (loan.loanAmount + (loan.loanAmount * (loan.interest / 100))) / loan.loanTerm;
            loan.paymentSchedule = generatePaymentSchedule(loan.loanTerm, loan.startDate);
            await user.save();
            await loan.save();

            res.status(201).send("Loan Succesfully Added!");
        } catch (error) {
            res.status(500).send({ message: 'Error ', error });
        }
    },
    monthly_loan_payment: async (req, res) => {
        const { loanId, paymentScheduleId, userId } = req.body;
        // console.log(userId);
        try {
            const result = await makeMonthlyLoanPayment(loanId, paymentScheduleId, userId);
            console.log(result);
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = loan_controller;
