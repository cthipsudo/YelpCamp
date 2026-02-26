const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const mongoose = require("mongoose");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

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
      author: `699f59313f87b9a12c0a3f43`,
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, nihil rerum! Aut perspiciatis numquam nisi quis quasi porro accusamus maiores optio hic voluptatem. Delectus sunt iusto cum eligendi deserunt quisquam.`,
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dorflj0ap/image/upload/v1772132734/adam-jang-MLKrf51NV8w-unsplash_foi3ho.jpg",
          filename: "YelpCamp/zxswydg2hgfkv237vgsu",
        },
        {
          url: "https://res.cloudinary.com/dorflj0ap/image/upload/v1772132736/robert-lukeman-zNN6ubHmruI-unsplash_bfy3ii.jpg",
          filename: "YelpCamp/cm0zpy0ta0hd0aqhtgo7",
        },
      ],
    });
    await campground.save();
  }
  console.log("Job's done!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
