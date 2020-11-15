const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
// DB Config
const db = require("./config/keys");
const routes = require("./routes");

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
    // during development, create a local .env file for MONGODB_URI
    db.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// User Authentication Source
// Build a Login/Auth App with the MERN Stack — Part 1 (Backend)
// https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

// Build a Login/Auth App with the MERN Stack — Part 2 (Frontend & Redux Setup)
//https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82

// Build a Login/Auth App with the MERN Stack — Part 3 (Linking Redux with React Components)
// https://blog.bitsrc.io/build-a-login-auth-app-with-the-mern-stack-part-3-react-components-88190f8db718