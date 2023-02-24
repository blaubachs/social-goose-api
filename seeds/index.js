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

  const userOneData = await Thoughts.insertMany(userOneThoughts);

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

  const userTwoData = await Thoughts.insertMany(userTwoThoughts);

  let userData = [
    {
      username: "bingus",
      email: "bingus@bingus.gov",
      thoughts: userOneData,
    },
    {
      username: "notBingus",
      email: "email@email.com",
      thoughts: userTwoData,
    },
    {
      username: "yahoo",
      email: "yahoo@yahoo.yahoo",
      thoughts: [],
    },
  ];

  await User.collection.insertMany(userData);

  console.log("Seeded  data into users");

  process.exit(1);
});
