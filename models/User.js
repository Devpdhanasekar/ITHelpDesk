const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    empName:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    complaints: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Complaint'
    }],
    resolvedComplaints: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Complaint'
        }],
},{timestamps:true})

module.exports = mongoose.model("User", userSchema);