const express = require('express');
const { createLocation, getAllLocations, getLocationById, updateLocationById, deleteLocationById } = require('../controllers/location-controller');
const locationRouter = express.Router();
// const = require('../controllers/locationController'); // Adjust the path as necessary

// Create a new location
locationRouter.post('/locations', createLocation);

// Get all locations
locationRouter.get('/locations', getAllLocations);

// Get a single location by ID
locationRouter.get('/locations/:id', getLocationById);

// Update a location by ID
locationRouter.put('/locations/:id', updateLocationById);

// Delete a location by ID
locationRouter.delete('/locations/:id', deleteLocationById);

module.exports = locationRouter;
