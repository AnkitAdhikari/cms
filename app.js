const express = require("express");
const app = express();
const { blogs } = require("./model/index");

require("./model/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("viewengine", "ejs");

app.get("/", async (req, res) => {
  const allBlogs = await blogs.findAll();
  console.log(allBlogs);
  res.render("home.ejs", { blogs: allBlogs });
});

app.get("/addBlog", (req, res) => {
  res.render("addBlog.ejs");
});

app.post("/createBlog", async (req, res) => {
  const { title, subtitle, description } = req.body;
  console.log(title, subtitle, description);
  await blogs.create({
    title,
    subtitle,
    description,
  });
  console.log(req.body);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("server running at port 8000");
});
