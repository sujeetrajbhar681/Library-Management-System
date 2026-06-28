const express = require('express');
const methodOverride = require('method-override');
const { connectDB } = require('./db');
const bookRouter = require('./Routes/bookRoutes');
const memberRouter = require('./Routes/memberRoutes');
const dashboardRouter = require('./Routes/dashboardRoutes');

const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", "./Views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.use("/", dashboardRouter);
app.use("/books", bookRouter);
app.use("/members", memberRouter);

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
