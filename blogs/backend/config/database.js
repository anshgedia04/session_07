const mongoose = require("mongoose");

const  dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/blogging")
            .then(() => console.log("db connected successfully"))
            .catch((err) => console.log("error while connection DB")) ;
}
module.exports = {
    dbConnect 
} ;