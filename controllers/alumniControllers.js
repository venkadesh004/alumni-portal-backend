const AlumniSchema = require('../model/alumniSchema');
const ChatSchema = require('../model/chatSchema');

const getData = async (req, res) => {
    const data = req.body;

    await AlumniSchema.findOne({email: data["email"]}).then(result => {
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

    await ChatSchema.insertMany({
        "alumniEmail": data["email"]
    }).then(async result => {
        await AlumniSchema.insertMany({
            "email": data["email"],
            "password": data["password"],
            "chat": result[0]["_id"].toString()
        }).then(output => {
            return res.status(200).json(output);
        }).catch(err => {
            return res.status(500).json({err: "Internal server Error!"});
        });
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    });
}

const editProfile = async (req, res) => {
    const data = req.body;

    await AlumniSchema.updateOne({email: data["email"]}, {
        $set: {
            name: data["name"],
            company: data["company"],
            position: data["position"],
            location: data["location"],
            linkedin: data["linkedin"]
        }
    }).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    })
}

module.exports.getData = getData;
module.exports.addData = addData;
module.exports.editProfile = editProfile;