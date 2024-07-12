const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  complaintFrom: { type: String },
  complaintBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  natureOfComplaint: { type: String, required: true },
  descriptionOfComplaint: { type: String },
  dateAndTimeOfComplaint: { type: Date, default: Date.now },
  location: { type: String, required: true },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: { type: String },
  remarks: { type: String },
  dateAndTimeOfResolution: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
