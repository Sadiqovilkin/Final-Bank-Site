const app = require('./config/index');
const express = require('express')
const cors = require("cors");
const router = require('./routes/user.route');
const routerBlog = require('./routes/blog.route');
const routerLoan = require('./routes/loan.route');

app.use(express.json())
app.use(cors());


app.use(router);
app.use(routerBlog);
app.use(routerLoan);
