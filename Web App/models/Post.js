const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    senderName: {
      type: String,
    },
    slot: {
      type: String,
    },
    sellerId:{
      type: String,
    },
    description:{
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
