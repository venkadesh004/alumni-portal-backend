const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(
    cors({
        origin: "*"
    })
);

app.use(bodyParser.json());

const connectDB = require('./db/db');

const alumniRoutes = require('./routes/alumniRoutes');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');

connectDB();

app.use('/alumni', alumniRoutes);
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);

app.listen(5000, () => {
    console.log("Server is listening");
})