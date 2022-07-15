const { Tag } = require("../models");

const tagData = [
  {
    tag_name: "pop music",
  },
  {
    tag_name: "rock music",
  },
  {
    tag_name: "white",
  },
  {
    tag_name: "yellow",
  },
  {
    tag_name: "red",
  },
  {
    tag_name: "blue",
  },
  {
    tag_name: "Black",
  },
  {
    tag_name: "culture",
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
