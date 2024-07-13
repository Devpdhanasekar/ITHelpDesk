const express = require('express');
const { addComplaint, editComplaint, deleteComplaint, getAllComplaints, updateComplaintStatusAndRemarks } = require('../controllers/complaint-controller');
const complaintRouter = express.Router();
complaintRouter.post("/addComplaint", addComplaint);
complaintRouter.post("/editComplaint", editComplaint);
complaintRouter.post("/update", updateComplaintStatusAndRemarks);
complaintRouter.post("/deleteComplaint", deleteComplaint);
complaintRouter.get("/getComplaints", getAllComplaints);
module.exports = complaintRouter;