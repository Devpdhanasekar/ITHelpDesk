// departmentController.js

const Department = require('../models/Department');

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { department } = req.body;
        const newDepartment = new Department({ Department: department });
        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        const departmentsArray = departments.map(department => department.Department);
        res.status(200).json(departmentsArray);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a department by ID
exports.updateDepartment = async (req, res) => {
    try {
        const { Department } = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate(
            req.params.id,
            { Department },
            { new: true }
        );
        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        if (!deletedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
