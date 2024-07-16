const express = require('express');
const userRouter = require('./routes/user-routes');
const app = express();
const port = 8080;
const CORS = require('cors');
const locationRouter = require('./routes/location-routes');
const complaintRouter = require('./routes/complaint-routes');
const deptRouter = require('./routes/department-routes');

app.use(CORS())
require('./models/db')
app.use(express.json());
app.use('/', userRouter)
app.use('/location', locationRouter);
app.use('/ticket', complaintRouter);
app.use('/dept', deptRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
