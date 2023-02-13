const express = require("express");
const cors = require("cors");
const models = require("./models");

// Controllers Import
const { indexRouter } = require("./controllers/IndexControllers");
const { gvhelpRouter } = require("./controllers/GvHelpControllers");
const { ndhelpRouter } = require("./controllers/NdHelpControllers");
const { myPageRouter } = require("./controllers/MypageControllers");
const { botRouter } = require("./controllers/BotControllers");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/index", indexRouter);
app.use("/gvhelp", gvhelpRouter);
app.use("/ndhelp", ndhelpRouter);
app.use("/mypage", myPageRouter);
app.use("/bot", botRouter);

app.listen(port, function () {
  console.log("Corona BLoom Server Running!!");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB Connect Success ✓");
    })
    .catch(function (err) {
      console.error(err);
      console.log("DB Connect Error ✗");
      process.exit();
    });
});
