const AlumniSchema = require('../model/alumniSchema');
const StudentSchema = require('../model/studentSchema');

const getData = async (req, res) => {
    const data = req.body;

    await StudentSchema.findOne({email: data["email"]}).then(result => {
        if (result["password"] === data["password"]) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({err: "Password Mismatch!"});
        }
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    })
}

const addData = async (req, res) => {
    const data = req.body;

    await StudentSchema.insertMany(data).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    })
}

const getAlumni = async (req, res) => {
    await AlumniSchema.find({}).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    })
}

module.exports.getData = getData;
module.exports.addData = addData;
module.exports.getAlumni = getAlumni;