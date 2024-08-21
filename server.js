require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const {logger, logEvents} = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

// connectDB();

// start logger first
app.use(logger); // logger we made in middleware

app.use(cors(corsOptions)); // use the cors dependency

app.use(express.json()); // add ability to process JSON

app.use(cookieParser());

/* ROUTING: */
// serve static files from public directory
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root")); // this is the routing to our root file, which displays the index page when we go to localhost3500
// app.use("/llm-test", require("./routes/chatRoutes")); // create the route for /llm
app.use("/hint-problem", require("./routes/hintRoute")); // create the route for /llm
app.use("/solve-problem", require("./routes/solutionRoute")); // create the route for /llm
app.use("/chat", require("./routes/chatRoutes")); // create the route for /llm
app.use("/convo", require("./routes/maizeyConvoRoutes")); // create the route for /llm
app.use("/message", require("./routes/maizeyMessageRoutes")); // create the route for /llm

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({message: "404 Not Found"});
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
