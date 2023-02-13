let peerIn = null;
let lastPeerInId = null;
let connIn = null;

function init_In(bId) {
  peerIn = new Peer();

  peerIn.on("open", function (id) {
    if (peerIn.id == null) {
      peerIn.id = lastPeerInId;
    } else {
      lastPeerInId = peerIn.id;
    }

    console.log(peerIn.id);
    $("#status").html("연결을 기다리는 중입니다... <br/>" + peerIn.id);
    $.ajax({
      type: "POST",
      url: "https://withus-board-server.herokuapp.com/ndhelp/chatid",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        board_id: parseInt(bId),
        board_chatid: peerIn.id,
      }),
      success: function (result) {
        console.log(result); // result 는 반환받은 JSON으로 만들어진 객체다.
      },
    });
  });

  peerIn.on("connection", function (con2In) {
    if (connIn && connIn.open) {
      con2In.on("open", function () {
        con2In.send("이미 다른 클라이언트와 연결되어 있습니다!");
        setTimeout(function () {
          con2In.close();
        }, 500);
      });
    }

    connIn = con2In;
    $("#status").html("상대방과 연결되었습니다. <br/>" + connIn.peer);
    ready();
  });

  peerIn.on("disconnected", function () {
    $("#status").html("연결이 끊어졌습니다.");

    peerIn.id = lastPeerId;
    peerIn._lastServerId = lastPeerId;
    peerIn.reconnect();
  });

  peerIn.on("close", function () {
    connIn = null;
  });

  peerIn.on("error", function (err) {
    alert(err);
  });
}

function ready() {
  connIn.on("data", function (data) {
    addMessage_In(data, "right");
  });

  connIn.on("close", function () {
    $("status").html("연결이 끊어졌습니다. 연결을 기다리는 중입니다...");
    connIn = null;
  });
}

function addMessage_In(msg, side) {
  var msgHtml = [];
  if (side == "left") {
    msgHtml.push('<li class="out">');
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
    msgHtml.push('<li class="in">');
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

  $("#chat_box").append(msgHtml.join(""));
}

function chat_In(bId) {
  init_In(bId);

  $("#sendMessageBox").keydown(function (key) {
    if (key.keyCode == 13) {
      if (connIn && connIn.open) {
        var msg = $("#sendMessageBox").val();
        $("sendMessageBox").val("");
        connIn.send(msg);
        addMessage_In(msg, "left");
      }
    }
  });
}
