const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permitted: {
        type: Boolean,
        default: false
    },
});

const StudentSchema = mongoose.model("StudentSchema", studentSchema);

module.exports = StudentSchema;