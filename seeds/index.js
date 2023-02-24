// run seeds here, will have to seed users and their respective thoughts
const connection = require("../config/connection");
const { User, Thoughts } = require("../models");

connection.once("open", async () => {
  // Delete all data
  await User.deleteMany({});
  await Thoughts.deleteMany({});
  // Seed data...

  let userOneThoughts = [
    {
      thoughtText: "This is bingus's first thought",
      username: "bingus",
    },
    {
      thoughtText: "Bingus's second thought",
      username: "bingus",
    },
  ];

  await Thoughts.insertMany(userOneThoughts);

  let userTwoThoughts = [
    {
      thoughtText: "I'm not bingus, what do you mean?",
      username: "notBingus",
    },
    {
      thoughtText: "Bingus's second thought, I mean, not bingus, haha",
      username: "notBingus",
    },
  ];

  await Thoughts.insertMany(userTwoThoughts);

  let userData = [
    {
      username: "bingus",
      email: "bingus@bingus.gov",
      thoughts: userOneThoughts,
    },
    {
      username: "notBingus",
      email: "email@email.com",
      thoughts: userTwoThoughts,
    },
    {
      username: "yahoo",
      email: "yahoo@yahoo.yahoo",
      thoughts: [],
    },
  ];

  await User.collection.insertMany(userData);

  console.log("Seeded  data into users");
});
