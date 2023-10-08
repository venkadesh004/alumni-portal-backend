const mongoose = require('mongoose');

const alumniSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "Your name"
    },
    company: {
        type: String,
        default: "Current Company"
    },
    position: {
        type: String,
        default: "Current position"
    },
    location: {
        type: String,
        default: "Location"
    },
    linkedin: {
        type: String,
        default: "Linkedin id"
    },
    chat: {
        type: String,
    }
});

const AlumniSchema = mongoose.model("AlumniSchema", alumniSchema);

module.exports = AlumniSchema;