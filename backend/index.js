require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8000;

   if(!fs.existsSync('./public'))
fs.mkdirSync('./public');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true,limit:'500mb' }));
app.use(cookieParser());
app.use(express.static("public"));
app.use((req,res,next)=>{
   req.header({
      'Access-Control-Allow-Origin':"*"
   })
   next()
})

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

// routes
const userRoutes = require("./routes/user.routes");
const imageRoutes = require("./routes/image.routes");
const videoRoutes = require("./routes/video.routes");
const followerRoutes = require("./routes/follower.routes");
const universalRoutes = require("./routes/universal.routes");
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/video", videoRoutes);
app.use("/api/v1/follower", followerRoutes);
app.use("/api/v1/universal", universalRoutes);

// listening
app.listen(PORT, () => {
  console.log("listening on port : " + PORT);
});
