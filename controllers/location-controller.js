const LocationName = require("../models/Location");
// Create a new location
exports.createLocation = async (req, res) => {
  const { location } = req.body;

  try {
    const newLocation = new LocationName({ location });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await LocationName.find().select('location -_id');
    const locationArray = locations.map(location => location.location);
    res.status(200).json(locationArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single location by ID
exports.getLocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await LocationName.findById(id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a location by ID
exports.updateLocationById = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;

  try {
    const updatedLocation = await LocationName.findByIdAndUpdate(
      id,
      { location },
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a location by ID
exports.deleteLocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLocation = await LocationName.findByIdAndDelete(id);
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
