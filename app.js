const express = require("express");
const app = express();
const { blogs } = require("./model/index");
const path = require('path');

require("./model/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.set("viewengine", "ejs");

app.get("/", async (req, res) => {
  const allBlogs = await blogs.findAll();
  console.log(allBlogs);
  res.render("home.ejs", { blogs: allBlogs });
});

app.get("/addBlog", (req, res) => {
  res.render("addBlog.ejs");
});

app.get('/single/:id',async(req,res)=>{
  const {id } = req.params;

  const blog = await blogs.findByPk(id);
  const {title,subtitle,description} = blog;
  // console.log(title,subtitle,description)
  // another way of retriving data
  // const blog = awiat blogs.findAll({
  //   where:{
  //     id,
  //   },
  // })

  res.render("singleBlog.ejs",{title,subtitle,description,id});
})

app.get('/delete/:id',async(req,res)=>{
  const id = req.params.id;
  await blogs.destroy({ where: { id } });
  res.redirect('/');
})

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
