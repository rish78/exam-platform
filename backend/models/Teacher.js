const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
    }

})

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;