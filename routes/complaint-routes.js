const express = require('express');
const { addComplaint, editComplaint, deleteComplaint } = require('../controllers/complaint-controller');
const complaintRouter = express.Router();
complaintRouter.post("/addComplaint",addComplaint);
complaintRouter.post("/editComplaint",editComplaint);
complaintRouter.post("/deleteComplaint",deleteComplaint);