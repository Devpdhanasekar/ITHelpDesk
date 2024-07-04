const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res, next) => {
    console.log("-----", req.body)
    const {
      userName,
      password,
      mobileNumber,
      role,
      location
    } = req.body;
    
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ mobileNumber });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = bcryptjs.hashSync(password);
  
      // Create a new user
      const user = new User({
        userName,
        password: hashedPassword,
        location,
        role,
        mobileNumber
      });
  
      // Save the user
      const savedUser = await user.save();
  
      if (!savedUser) {
        return res
          .status(500)
          .json({ message: "Unexpected error during saving user" });
      }
  
      // Generate a token
      const token = jwt.sign(
        { mobileNumber: savedUser.mobileNumber, userId: savedUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1week" }
      );
  
      // Send response
      res
        .status(201)
        .json({ message: "Signup Successful", token, user: savedUser });
  
      // Pass the token and userId to the next middleware if needed
      req.generatedToken = token;
      req.userId = savedUser._id;
  
      next();
    } catch (err) {
      console.error("Error during signup:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  const loginUser = async (req, res, next) => {
    const { userName, password } = req.body
    console.log(req.body)
    let existingUser;
    try {
      existingUser = await User.findOne({ userName })
    } catch (err) {
      console.log(err)
    }
  
    if (!existingUser) {
      res.status(404).json({ message: "User not found" })
    }
  
    console.log(existingUser)
  
    const correctPassword = bcryptjs.compareSync(password, existingUser.password)
  
    if (correctPassword) {
      // const token = jwt.sign(
      //   { id: existingUser._id },
      //   process.env.JWT_SECRET_KEY, // Replace with your secret key for signing the token
      //   { expiresIn: "1week" } // Token expiration time
      // );
    //   const token = jwt.sign(
    //     { email: existingUser.email, userId: existingUser._id },
    //     process.env.JWT_SECRET_KEY,
    //     { expiresIn: "1week" }
    //   );
    //   req.generatedToken = token;
      res.status(200).json(existingUser)
    }
    next()
  }


  module.exports = userSignup
  module.exports = loginUser