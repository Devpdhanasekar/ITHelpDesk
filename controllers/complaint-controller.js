const Complaint = require("../models/Complaint");
const User = require("../models/User");

// Function to add a complaint
const addComplaint = async (req, res) => {
    try {
        const { complaintBy, natureOfComplaint, dateAndTimeOfComplaint, location, assignedTo, status, remarks, dateAndTimeOfResolution, ticketStatus } = req.body;

        const newComplaint = new Complaint({
            complaintBy,
            natureOfComplaint,
            dateAndTimeOfComplaint,
            location,
            assignedTo,
            status,
            remarks,
            dateAndTimeOfResolution,
            ticketStatus
        });

        const savedComplaint = await newComplaint.save();

        // Assuming assignedTo contains userId
        const user = await User.findById(assignedTo.userId);
        if (user) {
            user.complaints.push(savedComplaint._id);
            await user.save();
        }

        res.status(201).json(savedComplaint);
    } catch (error) {
        res.status(500).json({ message: 'Error adding complaint', error });
    }
};

// Function to edit a complaint
const editComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const updateData = req.body;

        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, updateData, { new: true });

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ message: 'Error editing complaint', error });
    }
};

// Function to delete a complaint
const deleteComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);

        if (!deletedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Assuming assignedTo contains userId
        const user = await User.findById(deletedComplaint.assignedTo.userId);
        if (user) {
            user.complaints.pull(deletedComplaint._id);
            await user.save();
        }

        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting complaint', error });
    }
};


const getComplaintById = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const complaint = await Complaint.findById(complaintId).populate('assignedTo');

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaint', error });
    }
};


const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('assignedTo');

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaints', error });
    }
};

module.exports = {
    addComplaint,
    editComplaint,
    deleteComplaint
};
