const models = require("../models");
const Router = require("express");
const gvhelpRouter = Router();

gvhelpRouter.get("/", async (req, res) => {
  try {
    models.board
      .findAll({})
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
  gvhelpRouter,
};
