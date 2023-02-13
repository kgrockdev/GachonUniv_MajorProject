let peerOut = null;
let lastPeerIdOut = null;
let connOut = null;
let boardId = null;

function init_Out() {
  peerOut = new Peer();

  peerOut.on("open", function (id) {
    if (peerOut.id == null) {
      peerOut.id = lastPeerIdOut;
    } else {
      lastPeerIdOut = peerOut.id;
    }
  });

  peerOut.on("connection", function (con2Out) {
    con2Out.on("open", function () {
      con2Out.send("허가되지 않은 접근입니다.");
    });

    setTimeout(function () {
      con2Out.close();
    }, 500);
  });

  peerOut.on("disconnected", function () {
    peerOut.id = lastPeerIdOut;
    peerOut._lastServerId = lastPeerIdOut;
    peerOut.reconnect();
  });

  peerOut.on("close", function () {
    connOut = null;
    $("#statusOut").html("connection destroyed");
  });

  peerOut.on("error", function (err) {
    alert(err);
  });
}

function join_Out(bId) {
  if (connOut) {
    connOut.close();
  }

  connOut = peerOut.connect(bId);

  connOut.on("open", function () {
    $("#statusOut").html("Connect to " + connOut.peer);
  });

  connOut.on("data", function (data) {
    addMessage_Out(data, "right");
  });
}

function addMessage_Out(msg, side) {
  var msgHtml = [];
  if (side == "left") {
    msgHtml.push('<li class="in">');
    msgHtml.push('<div class="chat-img">');
    msgHtml.push(
      '<img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png" />'
    );
    msgHtml.push("</div>");
    msgHtml.push('<div class="chat-body">');
    msgHtml.push('<div class="chat-message">');
    msgHtml.push("<p>" + msg + "</p>");
    msgHtml.push("</div>");
    msgHtml.push("</div>");
    msgHtml.push("</li>");
  } else {
    msgHtml.push('<li class="out">');
    msgHtml.push('<div class="chat-img">');
    msgHtml.push(
      '<img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png" />'
    );
    msgHtml.push("</div>");
    msgHtml.push('<div class="chat-body">');
    msgHtml.push('<div class="chat-message">');
    msgHtml.push("<p>" + msg + "</p>");
    msgHtml.push("</div>");
    msgHtml.push("</div>");
    msgHtml.push("</li>");
  }

  $("#chat_box_Out").append(msgHtml.join(""));
}

function chat_Out(bId) {
  init_Out();

  $.ajax({
    type: "GET",
    url: `https://withus-board-server.herokuapp.com/ndhelp/chatid?board_id=${bId}`,
    async: false,
    success: function (result) {
      console.log(result);
      boardId = result.board.board_chatid;
    },
  });

  $("#chatOutConnectBtn").click(function () {
    join_Out(boardId);
  });

  $("#sendMessageBoxOut").keydown(function (key) {
    if (key.keyCode == 13) {
      if (connOut && connOut.open) {
        var msg = $("#sendMessageBoxOut").val();
        $("sendMessageBoxOut").val("");
        connOut.send(msg);
        addMessage_Out(msg, "left");
      }
    }
  });
}
