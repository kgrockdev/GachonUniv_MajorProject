const models = require("../models");
const Router = require("express");
const botRouter = Router();

const { calculateDistance } = require("../module/calculateDistance");
const { convertDate } = require("../module/convertDate");

botRouter.get("/", async (req, res) => {
  const { category, start_end, date, latlng } = req.query;

  var convDate = convertDate(date);

  const board = {
    category,
    start_end,
    date: convDate,
    latlng,
  };

  try {
    if (board.category === "전체") {
      models.board
        .findAll({})
        .then((fd1) => {
          var myDate = new Date(board.date);
          var dateFilterList = [];

          if (board.start_end === "시작") {
            fd1.map(function (item, index) {
              var date = item.board_start_date;

              if (date > myDate) {
                dateFilterList.push(item);
              }
            });

            var targetList = [];

            dateFilterList.map(function (item, index) {
              targetList.push([
                item.board_id,
                calculateDistance(
                  item.board_lat,
                  item.board_lng,
                  board.latlng.split(",")[0],
                  board.latlng.split(",")[1]
                ),
              ]);
            });

            targetList.sort(function (a, b) {
              return a[1] - b[1];
            });

            var resultList = [];

            // 1순위, 2순위, 3순위, ...
            targetList.map(function (item, index) {
              console.log(item[0]);
              dateFilterList.map(function (filterItem, filterIndex) {
                if (filterItem.board_id === item[0]) {
                  resultList.push(filterItem);
                }
              });
            });

            console.log(resultList);
            res.status(200).send({ resultList });
          } else if (board.start_end === "종료") {
            fd1.map(function (item, index) {
              var date = item.board_end_date;

              if (date < myDate) {
                dateFilterList.push(item);
              }
            });

            var targetList = [];

            dateFilterList.map(function (item, index) {
              targetList.push([
                item.board_id,
                calculateDistance(
                  item.board_lat,
                  item.board_lng,
                  board.latlng.split(",")[0],
                  board.latlng.split(",")[1]
                ),
              ]);
            });

            targetList.sort(function (a, b) {
              return a[1] - b[1];
            });

            var resultList = [];

            // 1순위, 2순위, 3순위, ...
            targetList.map(function (item, index) {
              console.log(item[0]);
              dateFilterList.map(function (filterItem, filterIndex) {
                if (filterItem.board_id === item[0]) {
                  resultList.push(filterItem);
                }
              });
            });

            console.log(resultList);
            res.status(200).send({ resultList });
          } else {
            res
              .status(500)
              .send({ error: "시작종료 변수의 값이 잘못되었습니다." });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: err.message });
        });
    } else {
      models.board
        .findAll({
          where: { board_category: board.category },
        })
        .then((fd1) => {
          var myDate = new Date(board.date);
          var dateFilterList = [];

          if (board.start_end === "시작") {
            fd1.map(function (item, index) {
              var date = item.board_start_date;

              if (date > myDate) {
                dateFilterList.push(item);
              }
            });

            var targetList = [];

            dateFilterList.map(function (item, index) {
              targetList.push([
                item.board_id,
                calculateDistance(
                  item.board_lat,
                  item.board_lng,
                  board.latlng.split(",")[0],
                  board.latlng.split(",")[1]
                ),
              ]);
            });

            targetList.sort(function (a, b) {
              return a[1] - b[1];
            });

            var resultList = [];

            // 1순위, 2순위, 3순위, ...
            targetList.map(function (item, index) {
              console.log(item[0]);
              dateFilterList.map(function (filterItem, filterIndex) {
                if (filterItem.board_id === item[0]) {
                  resultList.push(filterItem);
                }
              });
            });

            console.log(resultList);
            res.status(200).send({ resultList });
          } else if (board.start_end === "종료") {
            fd1.map(function (item, index) {
              var date = item.board_end_date;

              if (date < myDate) {
                dateFilterList.push(item);
              }
            });

            var targetList = [];

            dateFilterList.map(function (item, index) {
              targetList.push([
                item.board_id,
                calculateDistance(
                  item.board_lat,
                  item.board_lng,
                  board.latlng.split(",")[0],
                  board.latlng.split(",")[1]
                ),
              ]);
            });

            targetList.sort(function (a, b) {
              return a[1] - b[1];
            });

            var resultList = [];

            // 1순위, 2순위, 3순위, ...
            targetList.map(function (item, index) {
              console.log(item[0]);
              dateFilterList.map(function (filterItem, filterIndex) {
                if (filterItem.board_id === item[0]) {
                  resultList.push(filterItem);
                }
              });
            });

            console.log(resultList);
            res.status(200).send({ resultList });
          } else {
            res
              .status(500)
              .send({ error: "시작종료 변수의 값이 잘못되었습니다." });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: err.message });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = {
  botRouter,
};
