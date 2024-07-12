const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  complaintFrom: { type: String, required: true },
  complaintBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  natureOfComplaint: { type: String, required: true },
  dateAndTimeOfComplaint: { type: Date, required: true },
  location: { type: String, required: true },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: { type: String},
  remarks: { type: String},
  dateAndTimeOfResolution: { type: Date },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
