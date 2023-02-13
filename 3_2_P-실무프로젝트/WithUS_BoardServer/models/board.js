module.exports = function (sequelize, DataTypes) {
  const board = sequelize.define("board", {
    board_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    board_writer: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    board_title: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    board_content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    board_category: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    board_start_date: {
      type: DataTypes.DATE(100),
      defaultValue: null,
    },
    board_end_date: {
      type: DataTypes.DATE(100),
      defaultValue: null,
    },
    board_lat: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    board_lng: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    board_addr: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    board_region1Depth: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    board_region2Depth: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    board_ndid: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    board_gvid: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    board_close: {
      type: DataTypes.INTEGER(10),
      defaultValue: 1,
    },
    board_chatid: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
  });
  return board;
};
