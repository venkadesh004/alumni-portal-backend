const AlumniSchema = require("../model/alumniSchema");
const StudentSchema = require("../model/studentSchema");
const ChatSchema = require("../model/chatSchema");

const getData = async (req, res) => {
  const data = req.body;

  await StudentSchema.findOne({ email: data["email"] })
    .then((result) => {
      if (result["password"] === data["password"]) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json({ err: "Password Mismatch!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ err: "Internal server Error!" });
    });
};

const addData = async (req, res) => {
  const data = req.body;

  await StudentSchema.insertMany(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ err: "Internal server Error!" });
    });
};

const getAlumni = async (req, res) => {
  await AlumniSchema.find({})
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ err: "Internal server Error!" });
    });
};

const getFilters = async (req, res) => {
  var domains = [];
  var locations = [];
  var companies = [];

  await AlumniSchema.find({})
    .then((result) => {
      result.forEach((element) => {
        if (
          !domains.includes(element["position"]) &&
          element["position"] !== "Current position"
        ) {
          domains.push(element["position"]);
        }
        if (
          !locations.includes(element["location"]) &&
          element["location"] !== "Location"
        ) {
          locations.push(element["location"]);
        }
        if (
          !companies.includes(element["company"]) &&
          element["company"] !== "Current Company"
        ) {
          companies.push(element["company"]);
        }
      });

      return res.status(200).json([domains, locations, companies]);
    })
    .catch((err) => {
      return res.status(500).json({ err: "Internal server Error!" });
    });
};

const addChat = async (req, res) => {
  const data = req.body;

  await ChatSchema.findOne({ alumniEmail: data["email"] })
    .then(async (result) => {
      result["chats"].forEach((element, index) => {
        if (element["studentEmail"] === data["studentEmail"]) {
          var conversations = element["conversations"];
          conversations.push([data["chat"], "student"]);
          console.log(conversations);
          result["chats"][index] = {
            studentEmail: data["studentEmail"],
            conversations: conversations,
          };

          ChatSchema.updateOne(
            { alumniEmail: data["email"] },
            {
              $set: {
                chats: result["chats"],
              },
            }
          )
            .then((output) => {
              ChatSchema.findOne({ alumniEmail: data["email"] })
                .then((newResult) => {
                  return res.status(200).json(newResult);
                })
                .catch((err) => {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ err: "Internal server Error!" });
                });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ err: "Internal server Error!" });
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ err: "Internal server Error!" });
    });
};

const connectChat = async (req, res) => {
    const data = req.body;

    await StudentSchema.findOne({
        "email": data["studentEmail"]
    }).then(async response => {
        if (!response["chatRooms"].includes(data["email"])) {
            await StudentSchema.updateOne({
                "email": data["studentEmail"]
            }, {
                $push: {
                    chatRooms: data["email"]
                }
            }).then(async result => {
                var newObject = {
                    "studentEmail": data["studentEmail"],
                    "conversations": []
                };
                await ChatSchema.updateOne({"alumniEmail": data["email"]}, {
                    $push: {
                        chats: newObject 
                    }
                }).then(output => {
                    return res.status(200).json(output);
                }).catch(err => {
                    console.log(err);
                    return res.status(500).json({err: "Internal server Error!"});
                });
            }).catch(err => {
                console.log(err);
                return res.status(500).json({err: "Internal server Error!"});
            });
        }
    })
}

const getRequestedAlumni = async (req, res) => {
    const data = req.body;

    await StudentSchema.findOne({"email": data["email"]}).then(result => {
        return res.status(200).json(result["chatRooms"]);
    }).catch(err => {
        return res.status(500).json({err: "Internal server Error!"});
    });
}

module.exports.getData = getData;
module.exports.addData = addData;
module.exports.getAlumni = getAlumni;
module.exports.getFilters = getFilters;
module.exports.addChat = addChat;
module.exports.connectChat = connectChat;
module.exports.getRequestedAlumni = getRequestedAlumni;