const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DepartmentSchema = new Schema({
    Department: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Department", DepartmentSchema);