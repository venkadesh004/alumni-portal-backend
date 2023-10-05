const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const FacultySchema = new mongoose.model("FacultySchema", facultySchema);

module.exports = FacultySchema;