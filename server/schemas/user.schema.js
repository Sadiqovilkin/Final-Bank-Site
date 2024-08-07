const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        surname: String,
        address: String,
        city: String,
        region: String,
        phone: String,
        dateofbirth: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['admin', 'directory', 'client'],
        },
        image: String,
        companyName: String,
        seniority: Number,
        userId:String,
        gender: String,
        loans:Number,
        balance:Number,
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = userSchema;