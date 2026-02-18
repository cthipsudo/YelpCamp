const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const mongoose = require("mongoose");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected!");
});

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const campground = await new Campground({
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, nihil rerum! Aut perspiciatis numquam nisi quis quasi porro accusamus maiores optio hic voluptatem. Delectus sunt iusto cum eligendi deserunt quisquam.`,
      price,
    });
    await campground.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
