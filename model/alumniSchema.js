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
        default: ""
    },
    company: {
        type: String,
        default: ""
    },
    position: {
        type: String,
        default: "Unemployed"
    },
    location: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    chat: {
        type: String,
    }
});

const AlumniSchema = mongoose.model("AlumniSchema", alumniSchema);

module.exports = AlumniSchema;