const mongoose = require("mongoose");

/**
 *
 * alumniEmail: to sort out the alumni
 *
 * chats: Array of oobjects
 *
 * [
 *  {
 *      "studentEmail",
 *      "conversations":
 *             [
 *                  [chat, user],
 *                  [chat, user],
 *                  [chat, user]
 *              ]
 *  },
 *  {
 *      "studentEmail",
 *      "conversations":
 *             [
 *                  [chat, user],
 *                  [chat, user],
 *                  [chat, user]
 *              ]
 *  }
 * ]
 *
 *
 */

const chatSchema = mongoose.Schema({
  alumniEmail: {
    type: String,
    required: true,
  },
  chats: {
    type: Array,
  },
});

const ChatSchema = mongoose.model("ChatSchema", chatSchema);

module.exports = ChatSchema;
