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
  status: { type: String, required: true },
  remarks: { type: String, required: true },
  dateAndTimeOfResolution: { type: Date, required: true },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
