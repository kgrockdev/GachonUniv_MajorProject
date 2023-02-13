const models = require("../models");
const Router = require("express");
const axios = require("axios");
const ndhelpRouter = Router();

ndhelpRouter.get("/", async (req, res) => {
  const { board_category, page } = req.query;

  try {
    switch (board_category) {
      case "전체":
        models.board
          .findAll({})
          .then((total) => {
            models.board
              .findAll({
                order: [["board_id", "DESC"]],
                offset: (parseInt(page) - 1) * 9,
                limit: 9,
              })
              .then((board) => {
                res.status(200).send({
                  board,
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
      default:
        models.board
          .findAll({
            where: { board_category: board_category },
          })
          .then((total) => {
            models.board
              .findAll({
                order: [["board_id", "DESC"]],
                where: { board_category: board_category },
                offset: (parseInt(page) - 1) * 9,
                limit: 9,
              })
              .then((board) => {
                res.status(200).send({
                  board,
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

ndhelpRouter.get("/detail", async (req, res) => {
  const { board_id } = req.query;
  try {
    models.board
      .findOne({ where: { board_id: board_id } })
      .then((board) => {
        res.status(200).send({ board });
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

ndhelpRouter.post("/detail/put", async (req, res) => {
  const {
    board_id,
    board_writer,
    board_ndid,
    board_title,
    board_content,
    board_category,
    board_start_date,
    board_end_date,
    board_lat,
    board_lng,
    board_addr,
    board_region1Depth,
    board_region2Depth,
  } = req.body;

  try {
    models.board
      .findOne({ where: { board_id: board_id } })
      .then((board) => {
        board
          .update({
            board_id,
            board_writer,
            board_ndid,
            board_title,
            board_content,
            board_category,
            board_start_date,
            board_end_date,
            board_lat,
            board_lng,
            board_addr,
            board_region1Depth,
            board_region2Depth,
          })
          .then(() => {
            res.status(200).send({ message: "Success" });
          })
          .catch((err) => {
            res.status(500).send({ message: "Error", error: err.message });
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

ndhelpRouter.post("/write", async (req, res) => {
  const {
    board_writer,
    board_ndid,
    board_title,
    board_content,
    board_category,
    board_start_date,
    board_end_date,
    board_lat,
    board_lng,
    board_addr1,
    board_addr2,
    board_region1Depth,
    board_region2Depth,
  } = req.body;

  sumAddr = board_addr1 + "/" + board_addr2;

  try {
    models.board
      .create({
        board_writer,
        board_ndid,
        board_title,
        board_content,
        board_category,
        board_start_date,
        board_end_date,
        board_lat,
        board_lng,
        board_addr: sumAddr,
        board_region1Depth,
        board_region2Depth,
      })
      .then(() => {
        res.status(200).send({ message: "Success" });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error", error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

ndhelpRouter.post("/delete", async (req, res) => {
  const { board_id } = req.body;

  try {
    models.board
      .findOne({
        where: {
          board_id: board_id,
        },
      })
      .then((board) => {
        board
          .destroy()
          .then(() => {
            res.status(200).send({ message: "Success" });
          })
          .catch((err) => {
            res.status(500).send({ message: "Error", error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error", error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

ndhelpRouter.post("/match", async (req, res) => {
  const { board_id, board_gvid } = req.body;

  try {
    models.board
      .findOne({
        where: {
          board_id: board_id,
        },
      })
      .then((board) => {
        board
          .update({
            board_gvid: board_gvid,
            board_close: 2,
          })
          .then(() => {
            res.status(200).send({ message: "Success" });
          })
          .catch((err) => {
            res.status(500).send({ message: "Error", error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error", error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

ndhelpRouter.post("/deny", async (req, res) => {
  const { board_id } = req.body;

  try {
    models.board
      .findOne({
        where: {
          board_id: board_id,
        },
      })
      .then((board) => {
        board
          .update({
            board_close: 1,
            board_gvid: null,
          })
          .then(() => {
            res.status(200).send({ message: "Success" });
          })
          .catch((err) => {
            res.status(500).send({ message: "Error", error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error", error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

ndhelpRouter.post("/accept", async (req, res) => {
  const { board_id } = req.body;

  try {
    models.board
      .findOne({
        where: {
          board_id: board_id,
        },
      })
      .then((board) => {
        board
          .update({
            board_close: 3,
          })
          .then(() => {
            res.status(200).send({ message: "Success" });
          })
          .catch((err) => {
            res.status(500).send({ message: "Error", error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error", error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

ndhelpRouter.get("/chatid", async (req, res) => {
  const { board_id } = req.query;

  try {
    models.board
      .findOne({
        where: {
          board_id: board_id,
        },
      })
      .then((board) => {
        res.status(200).send({ board });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error", error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

ndhelpRouter.post("/chatid", async (req, res) => {
  const { board_id, board_chatid } = req.body;

  try {
    models.board
      .findOne({
        where: {
          board_id: board_id,
        },
      })
      .then((board) => {
        board
          .update({
            board_chatid: board_chatid,
          })
          .then(() => {
            res.status(200).send({ message: "Success" });
          })
          .catch((err) => {
            res.status(500).send({ message: "Error", error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error", error: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = {
  ndhelpRouter,
};
