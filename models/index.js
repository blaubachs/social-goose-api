const mongoose = require("mongoose");

function checkEmail(email) {
  let regexEmailChecker = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return regexEmailChecker.test(email);
}

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: String,
      default: new mongoose.Types.ObjectId().toString(),
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema.virtual("formattedTime").get(function () {
  return this.createdAt.toLocaleString();
});

reactionSchema.virtual("formattedTime").get(function () {
  return this.createdAt.toLocaleString();
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [checkEmail, "Please enter a valid email address."],
  },
  thoughts: [thoughtSchema],
});

const User = new mongoose.model("User", userSchema);
const Thoughts = new mongoose.model("Thoughts", thoughtSchema);

module.exports = {
  User,
  Thoughts,
};
