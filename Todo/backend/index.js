const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


const todoRoutes = require("./routes/todos");



app.use("/api/v1", todoRoutes);


app.listen(8000, () => {
    console.log("port run succesfully ")
});

const {dbConnect} = require("./config/database");
dbConnect();


app.get("/", (req, res) => {
    res.send("TESTED")
    console.log("get successfull");
});