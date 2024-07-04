const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

const connectDb = () => {
  mongoose
    .connect(//mongodb+srv://dev:T3MfgFBYJomFGIx5@cluster0.oh21qce.mongodb.net/
      `mongodb+srv://devpdhanasekar:9M1hOheDduyv7JY9@cluster0.rht3dgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Set a higher value than the default 30000 (30 seconds)
      }
    )
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};

connectDb();

exports.connectDb = connectDb;
