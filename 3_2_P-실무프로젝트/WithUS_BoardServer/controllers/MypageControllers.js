const models = require("../models");
const Router = require("express");
const myPageRouter = Router();

myPageRouter.get("/log", async (req, res) => {
  const { userid, mode, page } = req.query;

  try {
    switch (mode) {
      case "ndlog":
        models.board
          .findAll({
            where: { board_ndid: userid },
          })
          .then((total) => {
            models.board
              .findAll({
                where: { board_ndid: userid },
                offset: (parseInt(page) - 1) * 3,
                limit: 3,
              })
              .then((user) => {
                res.status(200).send({
                  user,
                  totalnum: total.length,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send({ error: err.message });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err.message });
          });
        break;
      case "gvlog":
        models.board
          .findAll({
            where: { board_gvid: userid },
          })
          .then((total) => {
            models.board
              .findAll({
                where: { board_gvid: userid },
                offset: (parseInt(page) - 1) * 3,
                limit: 3,
              })
              .then((user) => {
                res.status(200).send({
                  user,
                  totalnum: total.length,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send({ error: err.message });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err.message });
          });
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = {
  myPageRouter,
};
