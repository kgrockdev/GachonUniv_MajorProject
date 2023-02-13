const models = require("../models");
const Router = require("express");
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  try {
    models.board
      .findAll({ order: [["board_id", "DESC"]] })
      .then((user) => {
        res.status(200).send({
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = {
  indexRouter,
};
