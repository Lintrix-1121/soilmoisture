const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use (bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models/index.js");
const {Sequelize} = require('./config/dbConfig.js')

db.sequelize_config.sync(
    {force: false}
).then(() =>{
    console.log("Re-sync success")
})

require("./routes/users.route.js")(app);
require("./routes/embedded.route.js")(app);

app.listen(7000, () => {
    console.log("Fuel server on set");
});