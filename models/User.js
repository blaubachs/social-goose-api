const mongoose = require("mongoose");

function checkEmail(email) {
  let regexEmailChecker = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return regexEmailChecker.test(email);
}

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
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

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [checkEmail(email), "Please enter a valid email address."],
  },
  thoughts: [thoughtSchema],
});
