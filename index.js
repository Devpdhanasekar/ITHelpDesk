const express = require('express');
const userRouter = require('./routes/user-routes');
const app = express();
const port = 8080;
const CORS = require('cors');

app.use(CORS())
require('./models/db')
app.use(express.json());
app.use('/',userRouter)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
