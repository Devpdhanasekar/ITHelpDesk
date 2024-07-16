// departmentRoutes.js

const express = require('express');
const deptRouter = express.Router();
const departmentController = require('../controllers/department-controller');

// Create a new department
deptRouter.post('/', departmentController.createDepartment);

// Get all departments
deptRouter.get('/', departmentController.getDepartments);

// Get a department by ID
deptRouter.get('/:id', departmentController.getDepartmentById);

// Update a department by ID
deptRouter.put('/:id', departmentController.updateDepartment);

// Delete a department by ID
deptRouter.delete('/:id', departmentController.deleteDepartment);

module.exports = deptRouter;
