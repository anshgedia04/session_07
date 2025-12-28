const mongoose = require("mongoose");

const  dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/mongo-1")
            .then(() => console.log("db connected successfully"))
            .catch((err) => console.log("error while connection DB")) ;
}
module.exports = {
    dbConnect 
} ;