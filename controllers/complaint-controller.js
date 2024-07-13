const Complaint = require("../models/Complaint");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Function to add a complaint
const addComplaint = async (req, res) => {
    try {
        const {
            complaintFrom,
            natureOfComplaint,
            descriptionOfComplaint,
            dateAndTimeOfComplaint,
            // location,
            token,
        } = req.body;

        if (token) {
            jwt.verify(token, "ITHelpdesk", async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: false });
                } else {
                    try {
                        const user = await User.findById(decoded.id);
                        console.log(user);
                        if (!user) {
                            return res.status(404).json({ message: "User not found" });
                        }

                        // Find an "LAdmin" user with the same location
                        let assignedTo = await User.findOne({ role: "LAdmin", location: user.location });
                        const superAdmin = await User.findOne({ role: "SuperAdmin" });

                        if (!assignedTo) {
                            assignedTo = superAdmin;
                            // return res.status(404).json({ message: "No LAdmin found in the same location" });
                        }

                        // Create the new complaint
                        const newComplaint = new Complaint({
                            complaintFrom: complaintFrom,
                            complaintBy: user._id,
                            natureOfComplaint,
                            descriptionOfComplaint,
                            dateAndTimeOfComplaint,
                            location: user.location,
                            assignedTo: assignedTo._id,
                            status: "pending",
                        });

                        await newComplaint.save();
                        user.complaints.push(newComplaint._id);
                        await user.save();
                        assignedTo.receivedTickets.push(newComplaint._id);

                        return res.status(200).json({ message: true, complaint: newComplaint });
                    } catch (error) {
                        console.error(error);
                        return res.status(500).json({ message: false });
                    }
                }
            });
        } else {
            return res.status(400).json({ message: "Token not provided" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding complaint", error });
    }
};

module.exports = addComplaint;


// Function to edit a complaint
const editComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const updateData = req.body;

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId,
            updateData,
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ message: "Error editing complaint", error });
    }
};

// Function to delete a complaint
const deleteComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);

        if (!deletedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // Assuming assignedTo contains userId
        const user = await User.findById(deletedComplaint.assignedTo.userId);
        if (user) {
            user.complaints.pull(deletedComplaint._id);
            await user.save();
        }

        res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting complaint", error });
    }
};

const getComplaintById = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const complaint = await Complaint.findById(complaintId).populate(
            "assignedTo"
        );

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: "Error fetching complaint", error });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        // Find complaints and populate both complaintBy and assignedTo fields with userName
        const complaints = await Complaint.find()
            .populate("complaintBy", "userName mobileNumber")
            .populate("assignedTo", "userName");
        console.log(complaints);

        // Map the complaints to replace complaintBy and assignedTo with userName
        const formattedComplaints = complaints.map(complaint => ({
            _id: complaint._id,
            complaintFrom: complaint.complaintFrom,
            complaintBy: complaint.complaintBy.userName, // Use userName instead of id
            natureOfComplaint: complaint.natureOfComplaint,
            descriptionOfComplaint: complaint.descriptionOfComplaint,
            dateAndTimeOfComplaint: complaint.dateAndTimeOfComplaint,
            location: complaint.location,
            assignedTo: complaint.assignedTo.userName, // Use userName instead of id
            dateAndTimeOfResolution: complaint.dateAndTimeOfResolution,
            status: complaint.status,
            remarks: complaint.remarks,
            mobileNumber: complaint.complaintBy.mobileNumber
        }));

        res.status(200).json(formattedComplaints);
    } catch (error) {
        res.status(500).json({ message: "Error fetching complaints", error });
    }
};

module.exports = getAllComplaints;



module.exports = {
    addComplaint,
    editComplaint,
    deleteComplaint,
    getAllComplaints
};
