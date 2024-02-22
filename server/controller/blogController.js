//contact database
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require("uuid");

//create
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  //validate
  if (!slug) slug = uuidv4();

  switch (true) {
    case !title:
      return res.status(400).json({ error: "Please enter the title." });
      break;
    case !content:
      return res.status(400).json({ error: "Please enter the content." });
      break;
  }

  //save
  Blogs.create({ title, content, author, slug })
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(400).json({ error: "Please change your title name" });
    });
};

//get blogs
exports.getAllblogs = (req, res) => {
  Blogs.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

//get single blog
exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug })
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

//delete blog
exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndDelete({ slug })
    .then((blog) => {
      res.json({
        message: "Blog has been delete.",
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

//update blog
exports.edit = (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  ).then((blog) => {
    res.json(blog)
  })
  .catch((err) => {
    res.status(400).json({ error: err });
  })
};
