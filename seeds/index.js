// run seeds here, will have to seed users and their respective thoughts
const connection = require("../config/connection");
const { User, Thoughts } = require("../models");

connection.once("open", async () => {
  // Delete all data
  await User.deleteMany({});
  await Thoughts.deleteMany({});
  // Seed data...

  let userData = [
    {
      username: "bingus",
      email: "bingus@bingus.gov",
    },
    {
      username: "notBingus",
      email: "email@email.com",
    },
    {
      username: "yahoo",
      email: "yahoo@yahoo.yahoo",
    },
  ];

  await User.collection.insertMany(userData);

  console.log("Seeded  data into users");
});
