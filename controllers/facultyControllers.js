const FacultySchema = require('../model/facultySchema');
const StudentSchema = require('../model/studentSchema');

const getData = async (req, res) => {
    const data = req.body;

    await FacultySchema.findOne({email: data["email"]}).then(result => {
        if (result["password"] === data["password"]) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({err: "Password Mismatch"});
        }
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    })
}

const addData = async (req, res) => {
    const data = req.body;

    await FacultySchema.insertMany(data).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    })
}

const acceptStudent = async (req, res) => {
    const data = req.body;

    await StudentSchema.updateOne({email: data["email"]}, {$set: {
        permitted: true
    }}).then(async result => {
        await StudentSchema.find({
            permitted: false
        }).then(output => {
            return res.status(200).json(output);
        }).catch(err => {
            return res.status(500).json({err: "Internal server Error!"});
        });
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    });
}

const getUnacceptedStudents = async (req, res) => {
    await StudentSchema.find({
        permitted: false
    }).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json({err: "Internal server Errro!"});
    });
}

module.exports.getData = getData;
module.exports.addData = addData;
module.exports.acceptStudent = acceptStudent;
module.exports.getUnacceptedStudents = getUnacceptedStudents;