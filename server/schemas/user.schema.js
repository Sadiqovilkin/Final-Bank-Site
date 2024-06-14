const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        surname: String,
        address: String,
        city: String,
        region: String,
        phone: Number,
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
        gender: {
            type:String,
            enum:['male','female']
        },
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